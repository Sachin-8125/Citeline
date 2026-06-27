import { useState } from 'react'
import { Mail, User, LockKeyhole, Eye, EyeOff, ArrowRight, LoaderCircle, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!form.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
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
      await register(form);
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (requestError) {
      setStatus('idle');
      const validationMessage = requestError.response?.data?.errors?.[0]?.message;
      setError(
        validationMessage ||
        requestError.response?.data?.message ||
        'Unable to register'
      );
    }
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display-md text-display-md font-semibold text-primary mb-2">
            Citeline
          </h1>
          <p className="font-caption-mono text-caption-mono text-on-surface-variant uppercase tracking-wider font-medium">
            AI-powered research assistant
          </p>
        </div>

        <div className="bg-paper-raised border border-rule rounded-lg p-8 md:p-10 transition-all duration-300">
          <header className="mb-8 flex flex-col items-center">
            <h2 className="font-heading text-heading text-ink font-semibold">
              Create your account
            </h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2 group">
              <label
                htmlFor="full_name"
                className="font-caption-mono text-caption-mono text-ink flex items-center gap-2 group-focus-within:text-primary transition-colors font-medium text-[16px] leading-none"
              >
                <span className="material-symbols-outlined text-[16px]">
                  <User />
                </span>
                FULL NAME
              </label>
              <input
                type="text"
                id="full_name"
                name="name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Sachin Kumar"
                required
                autoComplete="name"
                className="w-full bg-transparent border-b border-rule py-2 px-0 font-body text-body text-ink focus:border-primary focus:ring-0 transition-colors outline-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <label
                htmlFor="email"
                className="font-caption-mono text-caption-mono text-ink flex items-center gap-2 group-focus-within:text-primary transition-colors font-medium text-[16px] leading-none"
              >
                <span className="material-symbols-outlined text-[16px]">
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
              <label
                htmlFor="password"
                className="font-caption-mono text-caption-mono text-ink flex items-center gap-2 group-focus-within:text-primary transition-colors font-medium text-[16px] leading-none"
              >
                <span className="material-symbols-outlined text-[18px]">
                  <LockKeyhole />
                </span>
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full bg-transparent border-b border-rule py-2 px-0 font-body text-body text-ink focus:border-primary focus:ring-0 transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-error text-sm font-body bg-error/10 p-3 rounded-lg border border-error/20">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`w-full text-on-primary font-heading text-heading py-4 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 font-bold ${
                status === 'success'
                  ? 'bg-tertiary-container'
                  : 'bg-primary-container hover:opacity-90 active:scale-[0.98]'
              }`}
            >
              {status === 'idle' && (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
              {status === 'submitting' && (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Authenticating...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={20} />
                  Welcome to Citeline
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-10 pt-6 border-t border-rule/50 text-center">
            <p className="font-body text-body text-on-surface-variant">
              Already have an account?
              <Link
                to="/signin"
                className="text-primary font-heading hover:underline underline-offset-4 ml-1 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};