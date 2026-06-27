import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  LockKeyhole, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  LoaderCircle, 
  CheckCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const validateForm = () => {
    if (!form.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!form.password) {
      setError('Password is required');
      return false;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      await login(form);

      if (isMounted.current) {
        setStatus('success');
        setTimeout(() => {
          if (isMounted.current) {
            navigate('/dashboard', { replace: true });
          }
        }, 1500);
      }
    } catch (requestError) {
      if (isMounted.current) {
        setStatus('idle');
        const validationMessage =
          requestError.response?.data?.errors?.[0]?.message;
        setError(
          validationMessage ||
          requestError.response?.data?.message ||
          'Invalid email or password'
        );
      }
    }
  };

  const handleChange = (field) => (e) => {
    if (error) setError(null);
    setForm(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <h1 className="font-display-md text-display-md text-primary font-bold mb-2">
            Citeline
          </h1>
          <p className="font-caption-mono text-caption-mono text-on-surface-variant uppercase tracking-wider font-medium">
            AI-powered research assistant
          </p>
        </div>

        <div className="bg-paper-raised border border-rule rounded-lg p-8 md:p-10 transition-all duration-300">
          <header className="mb-8 flex flex-col items-center">
            <h2 className="font-heading text-heading text-ink font-semibold">
              Sign in to your account
            </h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2 group">
              <label
                htmlFor="email"
                className="font-caption-mono text-caption-mono text-ink flex items-center gap-2 group-focus-within:text-primary transition-colors font-medium text-[16px] leading-none"
              >
                <span className="text-[16px]">
                  <Mail />
                </span>
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="sachin@gmail.com"
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-rule py-2 px-0 font-body text-body text-ink focus:border-primary focus:ring-0 transition-colors outline-none"
              />
            </div>

            {/* Password */}
            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="font-caption-mono text-caption-mono text-ink flex items-center gap-2 group-focus-within:text-primary transition-colors font-medium text-[16px] leading-none"
                >
                  <span className="text-[18px]">
                    <LockKeyhole />
                  </span>
                  PASSWORD
                </label>
                {/* ✅ Use Link instead of <a href="#"> */}
                <Link
                  to="/forgot-password"
                  className="font-caption-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-transparent border-b border-rule py-2 px-0 font-body text-body text-ink focus:border-primary focus:ring-0 transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="text-error text-sm font-body bg-error/10 p-3 rounded-lg border border-error/20"
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`w-full text-on-primary font-heading text-heading py-4 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 font-bold ${
                status === 'success'
                  ? 'bg-tertiary-container cursor-default'
                  : 'bg-primary-container hover:opacity-90 active:scale-[0.98]'
              }`}
            >
              {status === 'idle' && (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
              {status === 'submitting' && (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Signing in...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={20} />
                  Welcome back!
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-10 pt-6 border-t border-rule/50 text-center">
            <p className="font-body text-body text-on-surface-variant">
              New to Citeline?{' '}
              {/* ✅ Direct Link, no wrapping <a> tag */}
              <Link
                to="/signup"
                className="text-primary font-heading hover:underline underline-offset-4 ml-1 font-semibold"
              >
                Create an account
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}