'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { SITE_METADATA } from '@/data/content';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Property Opportunity',
    location: '',
    message: '',
    website_url: '', // Honeypot spam trap
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.type,
          location: formData.location,
          message: formData.message,
          source: '/contact',
          website_url: formData.website_url,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitted(true);
      // Clear the form only after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'Property Opportunity',
        location: '',
        message: '',
        website_url: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-canvas-warm py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Details & Advisory Info */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-4">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
                DIRECT CHANNELS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-950 leading-tight">
                HEADQUARTERS &amp; ENQUIRIES
              </h2>
              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                Our acquisitions and design teams operate directly from Central London, reviewing residential opportunities nationwide.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] flex items-center justify-center text-emerald-brand shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-400 block">
                    Direct Email
                  </span>
                  <a
                    href={'mailto:' + SITE_METADATA.email}
                    className="text-base sm:text-lg font-serif font-medium text-charcoal-950 hover:text-emerald-brand transition-colors block"
                  >
                    {SITE_METADATA.email}
                  </a>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] flex items-center justify-center text-emerald-brand shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-400 block">
                    Telephone
                  </span>
                  <a
                    href={'tel:' + SITE_METADATA.phone}
                    className="text-base sm:text-lg font-serif font-medium text-charcoal-950 hover:text-emerald-brand transition-colors block"
                  >
                    {SITE_METADATA.phone}
                  </a>
                </div>
              </div>

              {/* London Address Card */}
              <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] flex items-center justify-center text-emerald-brand shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-400 block">
                    Advisory Office
                  </span>
                  <p className="text-base sm:text-lg font-serif font-medium text-charcoal-950 leading-snug">
                    {SITE_METADATA.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Advisory Note */}
            <div className="p-6 rounded-2xl bg-[#EBF2EE]/60 border border-[#07381E]/15 text-left space-y-2">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#07381E] block">
                Discretion &amp; Privacy Assured
              </span>
              <p className="text-xs text-charcoal-700 font-sans leading-relaxed">
                All property opportunities, financial models, and seller particulars shared with Zalia Properties are handled with absolute discretion and non-disclosure governance.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-canvas-border p-8 sm:p-12 lg:p-14 shadow-soft-xl text-left">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EBF2EE] flex items-center justify-center text-emerald-brand mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-medium text-charcoal-950">
                    Enquiry Received
                  </h3>
                  <p className="text-base text-charcoal-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you. Your enquiry has been received. We&apos;ll be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        type: 'Property Opportunity',
                        location: '',
                        message: '',
                        website_url: '',
                      });
                    }}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#07381E] text-white text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#052B17] transition-colors"
                  >
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
                      SUBMIT AN ENQUIRY
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950">
                      How Can We Collaborate?
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Trap */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alexander Wright"
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@domain.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Telephone */}
                    <div className="space-y-2">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 ..."
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      />
                    </div>

                    {/* Nature of Enquiry */}
                    <div className="space-y-2">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                        Nature of Enquiry
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      >
                        <option value="Property Opportunity">Property Opportunity (Acquisition)</option>
                        <option value="Joint Venture">Joint Venture Partnership</option>
                        <option value="Investor Enquiry">Private Capital &amp; Investor Enquiry</option>
                        <option value="General Advisory">General Advisory &amp; Press</option>
                      </select>
                    </div>
                  </div>

                  {/* Location of Interest */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                      Property Location / Borough (If applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mayfair, Belgravia, Kensington, Surrey"
                      className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                      Message &amp; Particulars *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding the property, condition, timeline, or scope..."
                      className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-[13px] font-sans font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-soft-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
