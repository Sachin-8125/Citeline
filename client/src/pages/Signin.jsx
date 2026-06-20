import {useState} from "react";
import {ArrowRight, Eye, EyeOff} from "lucide-react";
import {Link} from "react-router-dom"

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-10">
          <h1 className="font-display-md text-display-md text-primary font-bold mb-2">
            Citeline
          </h1>
          <p className="font-body text-on-surface-variant opacity-80">
            AI-powered research assistant
          </p>
        </div>
        <div className="bg-paper-raised border border-rule rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <h2 className="flex flex-col items-center font-headingtext-heading mb-8 text-heading text-ink font-bold">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-caption-mono text-caption-mono  text-on-surface-variant block font-medium text-[16px] leading-none"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="sachin@gmail.com"
                required
                className="w-full bg-paper border border-rule rounded-lg px-4 py-3 font-body text-body text-ink placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            {/*Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="font-caption-mono text-caption-mono text-on-surface-variant block font-medium text-[16px] leading-none"
                >
                  PASSWORD
                </label>
                <a
                  href="#"
                  className="font-caption-mono text-[11px] text-ink-muted hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-paper border border-rule rounded-lg px-4 py-3 font-body text-body text-ink placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-ink transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary font-heading text-heading py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 font-semibold"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
          <div className="mt-8 pt-8 border-t border-rule text-center">
            <p className="font-body text-body text-on-surface-variant">
              New to Citeline?{" "}
              <a
                href="#"
                className="text-primary font-heading hover:underline underline-offset-4 font-semibold"
              >
                <Link to="/signup">Create an account</Link>
              </a>
            </p>
          </div>
        </div>

      </main>

    </div>
  )
}