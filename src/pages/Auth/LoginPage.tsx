import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { ArrowRight, ArrowLeft, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your academic or institutional email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between p-6">
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle compact={true} />
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-10">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-bold text-base mx-auto mb-3 shadow-xs">
            SR
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sign In to SciRAG
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5">
            Access your research corpus, semantic vector indexes, and grounded copilot.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div className="flex-1">
                <p className="font-medium">{error}</p>
                {error.toLowerCase().includes('register') && (
                  <Link
                    to={email ? `/register?email=${encodeURIComponent(email)}` : '/register'}
                    className="underline font-semibold mt-1 inline-block text-neutral-900 dark:text-neutral-100"
                  >
                    Click here to create an account {email ? `for ${email}` : 'now'}
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Academic or Institutional Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setError('Password reset instructions will be sent to registered institutional email.')}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Credentials...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
            <div className="text-[11px] text-neutral-500 font-medium mb-1">
              Quick Fill Registered Accounts:
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
              <span className="truncate pr-1">
                <span className="font-mono text-neutral-900 dark:text-neutral-100 font-medium">shreyashgautam2007@gmail.com</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('shreyashgautam2007@gmail.com');
                  setPassword('Wishyoubest_10');
                  setError(null);
                }}
                className="text-neutral-900 dark:text-neutral-100 font-semibold hover:underline cursor-pointer shrink-0 ml-2"
              >
                Fill Credentials
              </button>
            </div>

            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
              <span className="truncate pr-1">
                <span className="font-mono text-neutral-900 dark:text-neutral-100 font-medium">e.rostova@scirag.io</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('e.rostova@scirag.io');
                  setPassword('password123');
                  setError(null);
                }}
                className="text-neutral-900 dark:text-neutral-100 font-semibold hover:underline cursor-pointer shrink-0 ml-2"
              >
                Fill Credentials
              </button>
            </div>

            <p className="text-xs text-neutral-500 text-center pt-2">
              Don't have a research account?{' '}
              <Link
                to={email ? `/register?email=${encodeURIComponent(email)}` : '/register'}
                className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-neutral-400 font-mono">
        SciRAG · Confidential Academic Computing
      </div>
    </div>
  );
};
