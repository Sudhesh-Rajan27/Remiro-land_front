import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';
import { getBackendUrl } from '../lib/api';
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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const backendBaseUrl = getBackendUrl();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: 'http://localhost:5173',
    onSuccess: async (codeResponse) => {
      const targetUrl = `${backendBaseUrl}/api/auth/google`;
      console.log('Target URL:', targetUrl);
      try {
        const res = await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Google sign-in failed');
        if (!data.token) throw new Error('No token returned from server');
        localStorage.setItem('remiro_token', data.token);
        localStorage.setItem('remiro_user', JSON.stringify(data.user));
        navigate('/');
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Google sign-in failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google sign-in was cancelled or failed');
      setLoading(false);
    },
  });

  // Ping backend on mount to verify backendBaseUrl is reachable
  useEffect(() => {
    const url = `${backendBaseUrl}/api/test`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => console.log('Backend ping OK:', url, data))
      .catch((err) => console.error('Backend ping failed:', url, err));
  }, []);

  // If already logged in, send user straight to home
  useEffect(() => {
    const token = localStorage.getItem('remiro_token');
    if (token) {
      navigate('/', { replace: true });
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

      navigate('/');
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

      {/* Main Glass Card – narrower for login (less content), full width for signup */}
      <div
        className={`strict-glass w-full rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 modal-enter overflow-hidden ${
          mode === 'signup' ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-10 items-stretch ${
            mode === 'signup' ? 'min-h-[440px] md:min-h-[520px]' : 'min-h-[360px] md:min-h-[420px]'
          }`}
        >
          {/* Left: Header + Form – more breathing room */}
          <div className="flex flex-col justify-center py-4 md:py-6 pr-0 md:pr-2">
            {/* Header – logo lifted slightly higher */}
            <div className="mb-6 text-center md:text-left relative">
              <div className="md:absolute md:-top-12 md:-left-6 flex justify-center md:justify-start items-center">
                <img src="/logo.png" alt="Remiro" className="h-20 w-auto object-contain" />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-prim mb-2 mt-6 md:mt-4">
                {mode === 'signup' ? 'Create your account' : 'Log into your account'}
              </h1>
              <p className="font-body font-light text-text-sec text-sm sm:text-base md:text-lg">
                {mode === 'signup'
                  ? 'Secure early access to your cognitive career copilot.'
                  : 'Continue your journey with Remiro AI.'}
              </p>
            </div>

            {/* Mode toggle – 24px below */}
            <div className="auth-mode-toggle flex mb-6 rounded-2xl bg-white/40 p-1 gap-1">
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

            {/* Auth form – 24px between sections, 8px label-to-input */}
            <form className="space-y-0" onSubmit={handleSubmit}>
              {/* Continue with Google */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    googleLogin();
                  }}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white/60 border border-black/10 font-body font-medium text-text-prim hover:bg-white/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </button>
              </div>

              {/* Or divider */}
              <div className="flex items-center gap-4 mb-6">
                <span className="flex-1 h-px bg-black/10" aria-hidden="true" />
                <span className="font-body text-sm text-text-sec uppercase tracking-wider">Or</span>
                <span className="flex-1 h-px bg-black/10" aria-hidden="true" />
              </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="auth-field">
                <label className="ui-label">Full Name</label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="strict-input font-body w-full pl-4 pr-10 rounded-2xl text-[1rem]"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <span className="required-star">*</span>
                </div>
              </div>
              <div className="auth-field">
                <label className="ui-label">Region</label>
                <div className="relative mt-2">
                  <select
                    className="strict-input font-body w-full pl-4 pr-10 rounded-2xl text-[1rem] appearance-none cursor-pointer"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="auth-field">
              <label className="ui-label mt-2">Email Address</label>
              <div className="relative mt-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="strict-input font-body w-full pl-4 pr-10 rounded-2xl text-[1rem]"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="required-star">*</span>
              </div>
            </div>
            <div className="auth-field">
              <label className="ui-label mt-2">Password</label>
              <div className="relative mt-2 password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="strict-input font-body w-full pl-4 pr-12 rounded-2xl text-[1rem]"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-text-sec hover:text-text-prim hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-phoenix/30"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <span className="required-star">*</span>
              </div>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-field gap-6 mt-6 mb-6">
              <label className="ui-label mt-4">LinkedIn Profile</label>
              
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec/40">
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
                  className="strict-input font-body w-full pl-12 pr-4 rounded-2xl text-[1rem]"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-center text-sm font-body text-red-500 mb-4">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col items-stretch sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-4 sm:max-w-[280px] py-3 px-6 rounded-2xl text-white font-body font-bold uppercase tracking-widest text-[0.875rem] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
          </div>

          <p className="text-center text-sm text-text-sec mt-6 font-body">
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

          {/* Right: right.png – edge-to-edge fill, no horizontal white space */}
          <div className="hidden md:block relative min-h-full -mr-6 -mt-6 -mb-6 sm:-mr-8 sm:-mt-8 sm:-mb-8 md:-mr-10 md:-mt-10 md:-mb-10 lg:-mr-12 lg:-mt-12 lg:-mb-12 rounded-r-3xl overflow-hidden">
            <img
              src="/right.png"
              alt="Remiro"
              className="absolute inset-0 w-full h-full object-cover object-left border-0 m-0 p-0 block"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

