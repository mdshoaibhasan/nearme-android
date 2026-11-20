import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Store,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Phone,
  Sparkles,
  ShoppingBag,
  Briefcase,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { UserRole } from '../../types/nearme';

// ========================
// 1. SPLASH SCREEN
// ========================
export const SplashScreen: React.FC = () => {
  const { navigateTo } = useNearMe();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('welcome', true);
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div className="w-full h-full min-h-[580px] bg-gradient-to-b from-[#16834A] to-[#0E5E34] text-white flex flex-col items-center justify-between p-8 select-none">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated App Logo Pin */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-[#16834A] ring-8 ring-white/20 animate-pulse">
            <MapPin className="w-14 h-14 stroke-[2.2] fill-[#16834A]/10 text-[#16834A]" />
          </div>
          <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#FF9F43] flex items-center justify-center text-white shadow-md text-xs font-black">
            ৳
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight mb-2">NearMe</h1>
        <p className="text-sm font-medium text-emerald-100 max-w-[260px] leading-relaxed">
          Local Business & Street Vendor Discovery
        </p>

        <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Bangladesh Edition • BDT (৳)</span>
        </div>
      </div>

      <div className="w-full text-center pb-4">
        <p className="text-[11px] text-emerald-200/80 mb-3">
          Final-Semester University Software Engineering Project
        </p>
        <button
          onClick={() => navigateTo('welcome', true)}
          className="text-xs text-white/80 hover:text-white underline font-medium cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};

// ========================
// 2. WELCOME SCREEN
// ========================
export const WelcomeScreen: React.FC = () => {
  const { navigateTo, setUserRole } = useNearMe();

  const handleStart = (role: UserRole) => {
    setUserRole(role);
    navigateTo('role_selection');
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      <div className="pt-4 flex flex-col items-center text-center">
        {/* Illustration Badge */}
        <div className="w-20 h-20 rounded-2xl bg-[#E8F5EC] flex items-center justify-center text-[#16834A] mb-5 shadow-inner">
          <MapPin className="w-10 h-10 stroke-[2.2]" />
        </div>

        <span className="text-xs font-bold text-[#16834A] uppercase tracking-wider bg-[#E8F5EC] px-3 py-1 rounded-full mb-2">
          Discover Hyperlocal
        </span>
        <h2 className="text-2xl font-black text-[#202124] tracking-tight">
          Find Shops & Street Vendors Near You
        </h2>
        <p className="text-sm text-neutral-600 mt-2 max-w-xs leading-relaxed">
          Discover neighborhood grocery stores, tea stalls, snacks, and mobile vendors broadcasting live locations in Bangladesh.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="space-y-3 my-6">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
          <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] text-[#16834A] flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202124]">Radius Filter (500m - 5km)</h4>
            <p className="text-[11px] text-neutral-500">Find what is genuinely within walking distance.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
          <div className="w-8 h-8 rounded-lg bg-[#FFF2E2] text-[#FF9F43] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202124]">Live Street Vendor Check-In</h4>
            <p className="text-[11px] text-neutral-500">Mobile vans & tea stalls broadcast "Selling Here Today".</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
          <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] text-[#16834A] flex items-center justify-center shrink-0 mt-0.5">
            <Store className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202124]">Owner Portal & Catalog</h4>
            <p className="text-[11px] text-neutral-500">Local merchants register products & update prices in BDT (৳).</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={() => navigateTo('role_selection')}
          className="w-full py-3.5 px-4 rounded-xl bg-[#16834A] text-white font-bold text-sm hover:bg-[#0E5E34] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => navigateTo('login')}
            className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigateTo('register')}
            className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-[10px] text-neutral-400 pt-1">
          Local state prototype • Firebase & Maps ready in Phase 2
        </p>
      </div>
    </div>
  );
};

// ========================
// 3. ROLE SELECTION SCREEN
// ========================
export const RoleSelectionScreen: React.FC = () => {
  const { userRole, setUserRole, navigateTo, showSnackbar } = useNearMe();
  const [selected, setSelected] = useState<UserRole>(userRole);

  const handleContinue = () => {
    setUserRole(selected);
    showSnackbar(`Role selected: ${selected === 'customer' ? 'Customer' : 'Business Owner'}`);
    if (selected === 'customer') {
      navigateTo('customer_home');
    } else {
      navigateTo('owner_dashboard');
    }
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      <div>
        <div className="text-center pt-2 mb-6">
          <span className="text-[11px] font-bold text-[#16834A] uppercase tracking-wider bg-[#E8F5EC] px-3 py-1 rounded-full">
            Choose Your Experience
          </span>
          <h2 className="text-2xl font-black text-[#202124] tracking-tight mt-2">
            How will you use NearMe?
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            You can effortlessly toggle between both roles at any time.
          </p>
        </div>

        <div className="space-y-4">
          {/* Option 1: Customer */}
          <div
            onClick={() => setSelected('customer')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selected === 'customer'
                ? 'border-[#16834A] bg-[#E8F5EC]/40 shadow-sm'
                : 'border-neutral-200 hover:border-neutral-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  selected === 'customer'
                    ? 'bg-[#16834A] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                <ShoppingBag className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#202124]">I am a Customer</h3>
                  {selected === 'customer' && (
                    <CheckCircle2 className="w-5 h-5 text-[#16834A] fill-[#E8F5EC]" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Discover nearby grocery stores, street food, tea stalls, and fresh produce within walking distance.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[#16834A] font-semibold">
                  <span>• Distance radius filter</span>
                  <span>• Live map pins</span>
                  <span>• Product prices (৳)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Business Owner */}
          <div
            onClick={() => setSelected('owner')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selected === 'owner'
                ? 'border-[#16834A] bg-[#E8F5EC]/40 shadow-sm'
                : 'border-neutral-200 hover:border-neutral-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  selected === 'owner'
                    ? 'bg-[#16834A] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                <Briefcase className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#202124]">I am a Business Owner</h3>
                  {selected === 'owner' && (
                    <CheckCircle2 className="w-5 h-5 text-[#16834A] fill-[#E8F5EC]" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Manage your shop or mobile street cart, broadcast live selling spots, and update product catalogs.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[#FF9F43] font-semibold">
                  <span>• "I'm Selling Here Today"</span>
                  <span>• Product catalog</span>
                  <span>• Hours & contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2 space-y-2">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#16834A] text-white font-bold text-sm hover:bg-[#0E5E34] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <span>Continue as {selected === 'customer' ? 'Customer' : 'Business Owner'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[11px] text-neutral-400">
          Switch anytime in top bar or profile screen
        </p>
      </div>
    </div>
  );
};

// ========================
// 4. LOGIN SCREEN
// ========================
export const LoginScreen: React.FC = () => {
  const { login, userRole, setUserRole, navigateTo } = useNearMe();
  const [phone, setPhone] = useState('+880 1712-345678');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>(userRole);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid Bangladeshi phone number');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    login(phone, role);
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      <div>
        <div className="pt-2 mb-6">
          <span className="text-xs font-bold text-[#16834A] uppercase tracking-wider bg-[#E8F5EC] px-3 py-1 rounded-full">
            Welcome Back
          </span>
          <h2 className="text-2xl font-black text-[#202124] tracking-tight mt-2">
            Sign In to NearMe
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Access your local business discovery dashboard.
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="flex p-1 rounded-xl bg-neutral-100 mb-5">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('owner')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              role === 'owner'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Business Owner
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Mobile Number (Bangladesh)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1712-345678"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#16834A] focus:ring-1 focus:ring-[#16834A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#16834A] focus:ring-1 focus:ring-[#16834A]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#16834A]" />
              <span>Remember me</span>
            </label>
            <span className="text-[#16834A] font-semibold hover:underline cursor-pointer">
              Forgot PIN?
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all shadow-md cursor-pointer"
          >
            Sign In as {role === 'customer' ? 'Customer' : 'Owner'}
          </button>
        </form>
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-neutral-500">
        <span>Don't have an account yet? </span>
        <button
          onClick={() => navigateTo('register')}
          className="text-[#16834A] font-bold hover:underline cursor-pointer"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

// ========================
// 5. REGISTRATION SCREEN
// ========================
export const RegisterScreen: React.FC = () => {
  const { register, userRole, navigateTo } = useNearMe();
  const [name, setName] = useState('Tanvir Hossain');
  const [phone, setPhone] = useState('+880 1823-998877');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState<UserRole>(userRole);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!phone || phone.length < 10) {
      setError('Please provide a valid 11-digit mobile number');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    register(name, phone, role);
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      <div>
        <div className="pt-2 mb-5">
          <span className="text-xs font-bold text-[#16834A] uppercase tracking-wider bg-[#E8F5EC] px-3 py-1 rounded-full">
            Create Account
          </span>
          <h2 className="text-2xl font-black text-[#202124] tracking-tight mt-2">
            Join NearMe
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Discover or advertise hyperlocal vendors across Bangladesh.
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="flex p-1 rounded-xl bg-neutral-100 mb-4">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('owner')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              role === 'owner'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Business Owner
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Hossain"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#16834A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1823-998877"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#16834A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#16834A]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-[#16834A] shrink-0" />
            <span>Ready for Firebase Auth phone OTP in Phase 2</span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all shadow-md cursor-pointer"
          >
            Create {role === 'customer' ? 'Customer' : 'Owner'} Account
          </button>
        </form>
      </div>

      <div className="pt-4 pb-2 text-center text-xs text-neutral-500">
        <span>Already have an account? </span>
        <button
          onClick={() => navigateTo('login')}
          className="text-[#16834A] font-bold hover:underline cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
