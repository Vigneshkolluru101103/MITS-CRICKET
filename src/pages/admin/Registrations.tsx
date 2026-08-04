import React, { useState, useEffect } from 'react';
import { 
  subscribeToRegistrations, 
  updateRegistrationStatusInFirestore, 
  deleteRegistrationFromFirestore, 
  type PlayerRegistrationRecord 
} from '../../firebase/firestore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { CheckCircle2, XCircle, Trash2, Eye, Search, FileText } from 'lucide-react';

export const Registrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<PlayerRegistrationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');
  const [selectedScreenshotUrl, setSelectedScreenshotUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations((data) => {
      setRegistrations(data);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateRegistrationStatusInFirestore(id, 'Approved');
    } catch (err: any) {
      alert('Failed to approve registration: ' + err.message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateRegistrationStatusInFirestore(id, 'Rejected');
    } catch (err: any) {
      alert('Failed to reject registration: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this registration record?')) {
      try {
        await deleteRegistrationFromFirestore(id);
      } catch (err: any) {
        alert('Failed to delete registration: ' + err.message);
      }
    }
  };

  const filteredRegistrations = registrations.filter(r => {
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.branch.toLowerCase().includes(q) ||
      r.transactionId.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-display">Player Registrations</h1>
          <p className="text-sm text-slate-400">
            Realtime database entries from Firestore `registrations` collection.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {(['ALL', 'Pending', 'Approved', 'Rejected'] as const).map((st) => (
            <Button
              key={st}
              variant={statusFilter === st ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="h-4 w-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by player name, phone, branch, or transaction ID..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
        />
      </div>

      {/* Registrations Data Table */}
      <div className="glass-panel bg-slate-900/90 rounded-[24px] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs font-mono font-bold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Player Name & Category</th>
                <th className="px-6 py-4">Phone / Contact</th>
                <th className="px-6 py-4">Role & Style</th>
                <th className="px-6 py-4">Branch & Year</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Screenshot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500 font-mono text-xs">
                    No registrations found. Submit a player registration on the /register page to see Firestore records populate here.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.category && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Jersey: {item.jerseyName || item.name} {item.tshirtSize ? `(${item.tshirtSize})` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-300">
                      <div>{item.phone}</div>
                      <div className="text-[11px] text-slate-500">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="font-semibold text-emerald-400 font-mono">
                        {item.role ? item.role.replace('_', ' ') : 'N/A'}
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        {item.battingStyle || 'Standard Bat'} {item.bowlingStyle ? `| ${item.bowlingStyle}` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{item.department || item.branch}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        Yr: {item.batchYear || item.year} {item.rollNo ? `| Roll: ${item.rollNo}` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-amber-300 font-bold">
                      {item.transactionId}
                    </td>
                    <td className="px-6 py-4">
                      {item.paymentScreenshotUrl ? (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Eye className="h-3.5 w-3.5" />}
                          onClick={() => setSelectedScreenshotUrl(item.paymentScreenshotUrl)}
                        >
                          View Receipt
                        </Button>
                      ) : (
                        <span className="text-xs font-mono text-slate-500">No Receipt</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          item.status === 'Approved'
                            ? 'gold'
                            : item.status === 'Rejected'
                            ? 'crimson'
                            : 'slate'
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status !== 'Approved' && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                            onClick={() => item.id && handleApprove(item.id)}
                          >
                            Approve
                          </Button>
                        )}
                        {item.status !== 'Rejected' && (
                          <Button
                            variant="crimson"
                            size="sm"
                            icon={<XCircle className="h-3.5 w-3.5" />}
                            onClick={() => item.id && handleReject(item.id)}
                          >
                            Reject
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Trash2 className="h-3.5 w-3.5 text-rose-400" />}
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Screenshot Preview Modal */}
      <Modal
        isOpen={!!selectedScreenshotUrl}
        onClose={() => setSelectedScreenshotUrl(null)}
        title="Payment Screenshot Receipt"
        maxWidth="lg"
      >
        {selectedScreenshotUrl && (
          <div className="space-y-4 text-center">
            <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 max-h-[70vh] overflow-auto flex items-center justify-center">
              <img
                src={selectedScreenshotUrl}
                alt="Payment Receipt"
                className="max-h-[60vh] max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="flex justify-end pt-2">
              <a
                href={selectedScreenshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D4AF37] font-mono hover:underline flex items-center gap-1"
              >
                <FileText className="h-3.5 w-3.5" />
                Open Full Resolution File
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
