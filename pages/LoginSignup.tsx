import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth.css';

type Mode = 'login' | 'signup';

export default function LoginSignup() {
  const [mode, setMode] = useState<Mode>('signup');
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'https://remiro-land-back.onrender.com';

  // If already logged in, send user straight to dashboard
  useEffect(() => {
    const token = localStorage.getItem('remiro_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint =
        mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';

      const payload =
        mode === 'signup'
          ? { fullName, region, email, password, linkedin }
          : { email, password };

      const res = await fetch(`${backendBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (!data.token) {
        throw new Error('No token returned from server');
      }

      localStorage.setItem('remiro_token', data.token);
      localStorage.setItem('remiro_user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page flex items-center justify-center py-10 px-4">
      {/* Global Noise Texture */}
      <div className="noise-overlay" />

      {/* Liquid Gradients */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main Glass Card */}
      <div className="strict-glass w-full max-w-4xl rounded-3xl p-6 sm:p-10 relative z-10 modal-enter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Header + Form */}
          <div>
            {/* Header */}
            <div className="mb-6 text-center md:text-left relative">
              <div className="md:absolute md:-top-4 md:left-0 flex justify-center md:justify-start">
                <span className="ui-label">
                  {mode === 'signup' ? 'Join Remiro AI' : 'Welcome back'}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-text-prim mb-3 mt-6 md:mt-4">
                {mode === 'signup' ? 'Create your account' : 'Log into your account'}
              </h1>
              <p className="font-body font-light text-text-sec text-base sm:text-lg">
                {mode === 'signup'
                  ? 'Secure early access to your cognitive career copilot.'
                  : 'Continue your journey with Remiro AI.'}
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex mb-6 rounded-2xl bg-white/40 p-1 gap-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`w-1/2 py-2 rounded-2xl text-xs sm:text-sm font-body font-bold tracking-widest uppercase transition-all ${
                  mode === 'login'
                    ? 'btn-primary text-white shadow-md'
                    : 'text-text-sec'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`w-1/2 py-2 rounded-2xl text-xs sm:text-sm font-body font-bold tracking-widest uppercase transition-all ${
                  mode === 'signup'
                    ? 'btn-primary text-white shadow-md'
                    : 'text-text-sec'
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Auth form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="ui-label ml-1">Full Name</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="strict-input font-body w-full pl-4 pr-10 py-3 rounded-2xl text-[1.05rem]"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <span className="required-star">*</span>
                </div>
              </div>

              <div>
                <label className="ui-label ml-1">Region</label>
                <div className="relative mt-1">
                  <select
                    className="strict-input font-body w-full pl-4 pr-10 py-3 rounded-2xl text-[1.05rem] appearance-none cursor-pointer"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="" disabled>
                      Select your region
                    </option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>Africa</option>
                    <option>Oceania</option>
                  </select>
                  <span className="required-star right-8">*</span>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-smoked/50">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="ui-label ml-1">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="strict-input font-body w-full pl-4 pr-10 py-3 rounded-2xl text-[1.05rem]"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="required-star">*</span>
              </div>
            </div>

            <div>
              <label className="ui-label ml-1">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="strict-input font-body w-full pl-4 pr-10 py-3 rounded-2xl text-[1.05rem]"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="required-star">*</span>
              </div>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="ui-label ml-1">LinkedIn Profile</label>
              <span className="font-body text-text-sec/60 text-xs ml-2 mb-2 inline-block">
                (Highly Recommended)
              </span>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-text-sec/40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="strict-input font-body w-full pl-12 pr-4 py-3 rounded-2xl text-[1.05rem]"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-center text-sm font-body text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 mt-4 rounded-2xl text-white font-body font-bold uppercase tracking-widest text-[0.9rem] flex justify-center items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>
              {loading
                ? mode === 'signup'
                  ? 'Creating account...'
                  : 'Logging in...'
                : mode === 'signup'
                  ? 'Create account'
                  : 'Login'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>

          <p className="text-center text-sm text-text-sec mt-4 font-body">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-phoenix underline-offset-2 hover:underline"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                New to Remiro AI?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-phoenix underline-offset-2 hover:underline"
                >
                  Create an account
                </button>
              </>
            )}
          </p>
        </form>
          </div>

          {/* Right: Icon image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-xs aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-dawn/30 via-white/40 to-phoenix/30 blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-2xl bg-white/80">
                <img
                  src="/icon.jpeg"
                  alt="Remiro login illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

