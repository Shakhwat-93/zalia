'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { SITE_METADATA } from '@/data/content';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Property Opportunity',
    location: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
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

              {/* Office Address Card */}
              <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] flex items-center justify-center text-emerald-brand shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-400 block">
                    Registered Office
                  </span>
                  <p className="text-base font-serif font-medium text-charcoal-950">
                    {SITE_METADATA.address}
                  </p>
                  <span className="text-xs text-charcoal-500 font-sans block pt-0.5">
                    {SITE_METADATA.registration}
                  </span>
                </div>
              </div>

              {/* Confidentiality Guarantee */}
              <div className="p-5 rounded-2xl bg-[#EBF2EE]/60 border border-emerald-brand/20 flex items-center space-x-3 text-emerald-brand">
                <Shield className="w-5 h-5 shrink-0" />
                <span className="text-xs font-sans font-medium text-charcoal-700">
                  All property submissions are handled under strict non-disclosure and commercial discretion.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dedicated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 lg:p-14 rounded-3xl sm:rounded-[2.25rem] bg-white border border-canvas-border shadow-soft-xl text-left">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EBF2EE] text-emerald-brand flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-medium text-charcoal-950">
                    Thank You For Reaching Out
                  </h3>
                  <p className="text-base text-charcoal-600 font-sans max-w-md mx-auto leading-relaxed">
                    Our acquisitions team has received your enquiry. A director will review your submission and respond within 24 business hours.
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
                        placeholder="+44 (0) 7000 000000"
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                        Enquiry Nature *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-950 text-sm font-sans focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 transition-all"
                      >
                        <option value="Property Opportunity">Property Sale / Acquisition</option>
                        <option value="Joint Venture">Joint Venture Partnership</option>
                        <option value="Portfolio Acquisition">Portfolio Enquiry</option>
                        <option value="General Enquiry">General Information</option>
                      </select>
                    </div>
                  </div>

                  {/* Location / Postcode */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
                      Property Address or Area (if applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Kensington, London SW7"
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
                    className="w-full py-4 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-[13px] font-sans font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-soft-sm disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Enquiry'}</span>
                    <ArrowRight className="w-4 h-4" />
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
