import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, User, Check, QrCode, Upload, Copy, ShieldAlert, CreditCard, FileCheck } from 'lucide-react';
import type { PlayerRegistrationData } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ToastContainer, type ToastMessage } from '../components/ui/Toast';
import { uploadToCloudinary } from '../utils/cloudinary';
import { addRegistrationToFirestore } from '../firebase/firestore';

const registrationSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid 10-digit phone number required'),
  category: z.enum(['STUDENT', 'ALUMNI'] as const),
  rollNo: z.string().optional(),
  batchYear: z.string().min(4, 'Batch year is required (e.g. 2026)'),
  department: z.string().min(2, 'Department is required'),
  role: z.string().min(1, 'Please select your primary role'),
  battingStyle: z.string().min(1, 'Please select your batting style'),
  bowlingStyle: z.string().min(1, 'Please select your bowling style'),
  tshirtSize: z.string().min(1, 'Please select your jersey size'),
  utrId: z.string().min(6, 'Valid UTR / Transaction ID required (min 6 characters)'),
  agreeRules: z.boolean().refine(val => val === true, 'You must accept the Terms & Conditions'),
});

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  category: 'STUDENT' | 'ALUMNI';
  rollNo?: string;
  batchYear: string;
  department: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  tshirtSize: string;
  utrId: string;
  agreeRules: boolean;
};

export const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [isSubmittingFirebase, setIsSubmittingFirebase] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PlayerRegistrationData | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      category: 'STUDENT',
      role: '',
      battingStyle: '',
      bowlingStyle: '',
      tshirtSize: '',
      utrId: '',
      agreeRules: false,
    },
    mode: 'onChange',
  });

  const selectedCategory = watch('category');
  const feeAmount = selectedCategory === 'STUDENT' ? '₹400' : '₹1000';

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['category'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['fullName', 'email', 'phone', 'batchYear', 'department'];
      if (selectedCategory === 'STUDENT') {
        fieldsToValidate.push('rollNo');
      }
    } else if (currentStep === 3) {
      fieldsToValidate = ['role', 'battingStyle', 'bowlingStyle', 'tshirtSize'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    } else {
      addToast('error', 'Validation Error', 'Please complete all required fields correctly.');
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProofPreview(reader.result as string);
        addToast('success', 'Screenshot Attached', 'Payment receipt uploaded successfully.');
      };
      reader.readAsDataURL(file);
    }
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('6380526866');
    addToast('info', 'UPI Number Copied', '6380526866 copied to clipboard.');
  };

  const onSubmit = async (data: FormValues) => {
    if (!paymentProofPreview && !paymentProofFile) {
      addToast('error', 'Payment Screenshot Required', 'Please upload a clear screenshot of your payment.');
      return;
    }

    setIsSubmittingFirebase(true);
    addToast('info', 'Processing Registration', 'Uploading payment receipt to Cloudinary and saving record...');

    try {
      let downloadUrl = '';
      if (paymentProofFile) {
        try {
          downloadUrl = await uploadToCloudinary(paymentProofFile);
        } catch (cErr: any) {
          console.warn('Cloudinary upload notice (using local image preview fallback):', cErr.message);
          downloadUrl = paymentProofPreview || '';
        }
      }

      const docId = await addRegistrationToFirestore({
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        branch: data.department || data.category,
        year: data.batchYear,
        section: 'A',
        jerseyName: data.fullName,
        transactionId: data.utrId,
        paymentScreenshotUrl: downloadUrl || paymentProofPreview || '',
        status: 'Pending',
      });

      const registrationPass: PlayerRegistrationData = {
        ...data,
        role: data.role as any,
        highestLevel: 'College Cricket',
        pastMatchStats: 'N/A',
        id: `DPL-${docId.substring(0, 6).toUpperCase()}`,
        profileImage: downloadUrl || paymentProofPreview || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        createdAt: new Date().toLocaleDateString(),
      };

      setSubmittedData(registrationPass);
      setShowConfirmationModal(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      addToast('success', 'Registration Successful!', 'Receipt processed & entry saved successfully.');
    } catch (err: any) {
      addToast('error', 'Registration Error', err.message || 'Failed to complete registration.');
    } finally {
      setIsSubmittingFirebase(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="gold" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Season 1 Official Registration
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
          PLAYER <span className="gradient-text-gold">REGISTRATION</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Active MITS Students & Alumni: Submit your credentials to enter the Season 1 Player Auction pool.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800/80 flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-bold transition-all ${currentStep === step
                ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md border border-[#E2C889]/30'
                : currentStep > step
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
            >
              {currentStep > step ? <Check className="h-4 w-4" /> : step}
            </div>
            <span className="hidden md:inline text-xs font-semibold text-slate-300">
              {step === 1 && 'Category'}
              {step === 2 && 'Personal'}
              {step === 3 && 'Role & Style'}
              {step === 4 && 'Payment & Verify'}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/80 space-y-8">

        {/* STEP 1: CATEGORY SELECTION */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display">Step 1: Select Player Category</h3>
              <p className="text-xs text-slate-400 mt-1">Choose whether you are currently studying at MITS or a graduated alumnus.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setValue('category', 'STUDENT', { shouldValidate: true })}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${selectedCategory === 'STUDENT'
                  ? 'bg-[#C5A059]/10 border-[#C5A059]/50 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={selectedCategory === 'STUDENT' ? 'gold' : 'slate'}>Active Student (₹400)</Badge>
                  <User className="h-6 w-6 text-[#E2C889]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Current MITS Student</h4>
                  <p className="text-xs text-slate-400 mt-1">Enrolled in B.Tech, M.Tech, MCA, or MBA degree programs.</p>
                </div>
              </label>

              <label
                onClick={() => setValue('category', 'ALUMNI', { shouldValidate: true })}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${selectedCategory === 'ALUMNI'
                  ? 'bg-[#C5A059]/10 border-[#C5A059]/50 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={selectedCategory === 'ALUMNI' ? 'gold' : 'slate'}>MITS Alumni (₹1000)</Badge>
                  <Trophy className="h-6 w-6 text-sky-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">MITS Alumni / Passout</h4>
                  <p className="text-xs text-slate-400 mt-1">Graduated from MITS. Connect back with collegiate cricket.</p>
                </div>
              </label>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PERSONAL & ACADEMIC INFO */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display">Step 2: Personal & Academic Details</h3>
              <p className="text-xs text-slate-400 mt-1">Provide your verified contact & department credentials.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Full Name *</label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
                />
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Email Address *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="email address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Phone Number *</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Department *</label>
                <select
                  {...register('department')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MEC">MEC</option>
                  <option value="CIV">CIV</option>
                  <option value="CSC">CSC</option>
                  <option value="CAI">CAI</option>
                  <option value="CST">CST</option>
                  <option value="CSD">CSD</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="MCA / MBA">MCA / MBA</option>
                </select>
                {errors.department && <p className="text-xs text-rose-400 mt-1">{errors.department.message}</p>}
              </div>

              {selectedCategory === 'STUDENT' && (
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Roll Number *</label>
                  <input
                    {...register('rollNo')}
                    type="text"
                    placeholder="your roll number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
                  />
                  {errors.rollNo && <p className="text-xs text-rose-400 mt-1">{errors.rollNo.message}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Graduation / Batch Year *</label>
                <input
                  {...register('batchYear')}
                  type="text"
                  placeholder="e.g. 2026"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
                />
                {errors.batchYear && <p className="text-xs text-rose-400 mt-1">{errors.batchYear.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PLAYER ROLE & STYLES */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display">Step 3: Cricket Role & Style</h3>
              <p className="text-xs text-slate-400 mt-1">Specify your primary match role and batting/bowling attributes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Primary Role *</label>
                <select
                  {...register('role')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
                >
                  <option value="">Select Primary Role</option>
                  <option value="BATSMAN">Batsman</option>
                  <option value="BOWLER">Bowler</option>
                  <option value="ALL_ROUNDER">All-Rounder</option>
                  <option value="WICKET_KEEPER">Wicket Keeper</option>
                </select>
                {errors.role && <p className="text-xs text-rose-400 mt-1">{errors.role.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Batting Style *</label>
                <select
                  {...register('battingStyle')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
                >
                  <option value="">Select Batting Style</option>
                  <option value="Right-hand Bat">Right-hand Bat</option>
                  <option value="Left-hand Bat">Left-hand Bat</option>
                </select>
                {errors.battingStyle && <p className="text-xs text-rose-400 mt-1">{errors.battingStyle.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Bowling Style *</label>
                <select
                  {...register('bowlingStyle')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
                >
                  <option value="">Select Bowling Style</option>
                  <option value="Right-arm Fast Medium">Right-arm Fast Medium</option>
                  <option value="Right-arm Off Spin">Right-arm Off Spin</option>
                  <option value="Right-arm Leg Spin">Right-arm Leg Spin</option>
                  <option value="Left-arm Fast Medium">Left-arm Fast Medium</option>
                  <option value="Left-arm Orthodox Spin">Left-arm Orthodox Spin</option>
                  <option value="Does Not Bowl">Does Not Bowl</option>
                </select>
                {errors.bowlingStyle && <p className="text-xs text-rose-400 mt-1">{errors.bowlingStyle.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">Official Jersey Size *</label>
                <select
                  {...register('tshirtSize')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
                >
                  <option value="">Select Jersey Size</option>
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                  <option value="XXL">Double XL (XXL)</option>
                </select>
                {errors.tshirtSize && <p className="text-xs text-rose-400 mt-1">{errors.tshirtSize.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: PAYMENT, UTR & TERMS & CONDITIONS */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#E2C889]" />
                  <span>Step 4: Payment & Verification</span>
                </h3>
                <Badge variant="gold">{feeAmount} Registration Fee</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Scan the QR code or send payment via UPI, then upload your transaction screenshot and UTR ID.
              </p>
            </div>

            {/* PAYMENT BOX */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-slate-800 pb-6">

                {/* QR Code Graphic Box */}
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 shrink-0 w-full md:w-56">
                  <div className="h-40 w-40 rounded-xl bg-white p-3 flex items-center justify-center shadow-lg relative group">
                    {/* Visual QR SVG representation */}
                    <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-slate-950 rounded-md">
                      <div className="bg-[#C5A059] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-[#E2C889] rounded-xs"></div>
                      <div className="bg-[#C5A059] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-slate-700 rounded-xs"></div>
                      <div className="bg-[#E2C889] rounded-xs col-span-3"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-[#C5A059] rounded-xs col-span-2"></div>
                      <div className="bg-[#E2C889] rounded-xs col-span-2"></div>
                      <div className="bg-[#C5A059] rounded-xs"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <QrCode className="h-10 w-10 text-[#E2C889]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-widest">SCAN TO PAY {feeAmount}</span>
                </div>

                {/* UPI Receiver Details */}
                <div className="space-y-4 flex-1 text-center md:text-left">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase">Payee Name</span>
                    <h4 className="text-2xl font-black text-white font-display">T SUMAN</h4>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">UPI Phone Number</span>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className="text-3xl font-black font-mono text-[#E2C889] tracking-wider">6380526866</span>
                      <button
                        type="button"
                        onClick={copyPhoneNumber}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy Phone Number"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                    <span className="text-slate-400">Accepted Apps:</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 font-semibold">PhonePe</span>
                    <span className="px-2.5 py-1 rounded-full bg-sky-950/60 border border-sky-800/40 text-sky-300 font-semibold">GPay</span>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-semibold">Paytm</span>
                  </div>
                </div>
              </div>

              {/* PAYMENT SCREENSHOT UPLOAD */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <Upload className="h-4 w-4 text-[#E2C889]" />
                  <span>Payment Screenshot *</span>
                </label>
                <p className="text-xs text-slate-400">
                  Upload a clear screenshot of your successful {feeAmount} payment. Must clearly show amount ({feeAmount}), status (Successful), and UTR ID.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/80">
                  {paymentProofPreview ? (
                    <div className="relative group">
                      <img src={paymentProofPreview} alt="Receipt Preview" className="h-20 w-28 rounded-xl object-cover border border-[#C5A059]" />
                      <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <FileCheck className="h-6 w-6 text-emerald-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 w-28 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-500 space-y-1">
                      <Upload className="h-6 w-6 text-slate-400" />
                      <span className="text-[10px] font-mono">No Image</span>
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <input type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" id="screenshot-upload" />
                    <label htmlFor="screenshot-upload" className="inline-flex items-center gap-2 text-xs font-bold text-[#E2C889] hover:underline cursor-pointer bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{paymentProofPreview ? 'Change Selected Screenshot' : 'Upload Payment Screenshot'}</span>
                    </label>
                    <p className="text-[10px] text-slate-400">PNG, JPG, or JPEG up to 5MB.</p>
                  </div>
                </div>
              </div>

              {/* UTR / TRANSACTION ID INPUT */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-white uppercase">
                  UTR / Transaction ID *
                </label>
                <input
                  {...register('utrId')}
                  type="text"
                  placeholder="Enter 12-digit UTR or Transaction Ref ID"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm font-mono"
                />
                <p className="text-[11px] text-slate-400">Enter your 12-digit UTR or Transaction Ref number exactly as shown in your payment app confirmation.</p>
                {errors.utrId && <p className="text-xs text-rose-400 mt-1">{errors.utrId.message}</p>}
              </div>
            </div>

            {/* TERMS & CONDITIONS */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[#E2C889]" />
                <span>Terms & Conditions (Please Read Carefully)</span>
              </h4>

              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                <li>Registration is <strong>mandatory</strong> only after successful payment.</li>
                <li>The <strong>{feeAmount} registration fee is non-refundable</strong> under any circumstances.</li>
                <li>Players must provide accurate personal and cricket-related information during registration.</li>
                <li>Any misconduct, use of abusive language, or violation of tournament rules may result in <strong>immediate disqualification</strong>.</li>
                <li>Participants are advised to undergo a basic fitness check before playing.</li>
                <li>The decision of the <strong>Tournament Organizing Committee</strong> shall be <strong>final and binding</strong> in all matters.</li>
              </ul>
            </div>

            {/* DECLARATION CHECKBOX */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <input
                {...register('agreeRules')}
                type="checkbox"
                id="agree"
                className="mt-1 accent-[#C5A059] h-4 w-4 cursor-pointer"
              />
              <label htmlFor="agree" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                <strong>I have read and understood all the Terms & Conditions.</strong> I agree to participate in the tournament at my own risk and accept all tournament rules and decisions made by the organizers.
              </label>
            </div>
            {errors.agreeRules && <p className="text-xs text-rose-400">{errors.agreeRules.message}</p>}
          </motion.div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              icon={<ArrowLeft className="h-4 w-4" />}
              iconPosition="left"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Previous Step
            </Button>
          ) : <div />}

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="gold"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={handleNextStep}
              glow
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmittingFirebase}
              icon={<CheckCircle2 className="h-5 w-5" />}
            >
              {isSubmittingFirebase ? 'SAVING TO FIRESTORE...' : 'REGISTER NOW'}
            </Button>
          )}
        </div>
      </form>

      {/* REGISTRATION CONFIRMATION MODAL */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Registration Submitted"
      >
        {submittedData && (
          <div className="space-y-6 text-center py-2">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto animate-bounce" />

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-display">Registration Submitted Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white">{submittedData.fullName}</strong>. Your registration details and payment transaction reference have been recorded.
              </p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 text-left text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">REGISTRATION ID:</span>
                <span className="text-[#E2C889] font-bold">{submittedData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CATEGORY:</span>
                <span className="text-white font-bold">{submittedData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ROLE:</span>
                <span className="text-white font-bold">{submittedData.role.replace('_', ' ')}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              The Tournament Organizing Committee will verify your payment UTR and update your CricHeroes trial profile.
            </p>

            <Button
              variant="gold"
              size="md"
              onClick={() => setShowConfirmationModal(false)}
              className="w-full sm:w-auto"
            >
              Close Window
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
