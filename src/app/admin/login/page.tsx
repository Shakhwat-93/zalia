'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, ShieldAlert, ArrowLeft } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid administrator credentials.');
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        // Force router refresh so server-side middleware and layout recognize the new session cookie
        router.push(redirectTarget);
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected authentication error occurred.';
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#041F11] text-white flex flex-col justify-between p-6 sm:p-10 font-sans selection:bg-[#2F7658] selection:text-white relative overflow-hidden">
      
      {/* Background Architectural Ambient Radial Gradients */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#07381E]/50 blur-[120px] pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#2F7658]/20 blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />

      {/* Top Header Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Website</span>
        </Link>

        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2F7658]">
          ZALIA SECURE CMS v1.0
        </span>
      </div>

      {/* Central Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto py-12">
        <div className="bg-[#07381E]/70 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 shadow-2xl space-y-8">
          
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="relative w-12 h-12 mx-auto mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Zalia Properties" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
            
            <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Executive Portal
            </h1>
            <p className="text-xs sm:text-[13px] text-white/60 font-sans leading-relaxed">
              Zalia Properties Management &amp; Content Infrastructure
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs flex items-start space-x-3">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/70 block">
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zaliaproperties.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#2F7658] focus:ring-2 focus:ring-[#2F7658]/30 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/70 block">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#2F7658] focus:ring-2 focus:ring-[#2F7658]/30 transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-4 rounded-full bg-white hover:bg-white/90 text-[#07381E] text-xs font-sans font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-soft-lg disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying Identity...' : 'Authenticate'}</span>
              <ArrowRight className="w-4 h-4 text-[#07381E]" />
            </button>
          </form>

        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 pt-6 border-t border-white/10 gap-3">
        <span>&copy; {new Date().getFullYear()} Zalia Properties Ltd. Restricted Access.</span>
        <span>Authorized Personnel Only · TLS 256-Bit Encrypted</span>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#041F11]" />}>
      <LoginForm />
    </Suspense>
  );
}
