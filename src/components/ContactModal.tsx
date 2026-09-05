'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { SITE_METADATA } from '@/data/content';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Residential Transformation',
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
          subject: formData.propertyType,
          location: formData.location,
          message: formData.message,
          source: typeof window !== 'undefined' ? window.location.pathname || 'modal' : 'modal',
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
        propertyType: 'Residential Transformation',
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

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: 'Residential Transformation',
      location: '',
      message: '',
      website_url: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07381E]/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white p-8 sm:p-12 shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-canvas-border">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#07381E]">
                  DIRECT ENQUIRY
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-charcoal-900 mt-1">
                  Let&apos;s Start a Conversation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2.5 text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex-1">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EBF2EE] flex items-center justify-center text-[#07381E]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-medium text-charcoal-900">
                    Enquiry Received
                  </h4>
                  <p className="text-sm font-sans text-charcoal-600 max-w-sm leading-relaxed">
                    Thank you. Your enquiry has been received. We&apos;ll be in touch shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-2.5 bg-[#07381E] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#052B17] transition-colors"
                  >
                    Close &amp; Return
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-start space-x-2">
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

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Telephone
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 20 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Enquiry Nature
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      >
                        <option value="Residential Transformation">Residential Transformation</option>
                        <option value="Property Acquisition">Direct Property Sale / Acquisition</option>
                        <option value="Joint Venture">Joint Development Venture</option>
                        <option value="General Enquiry">General Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Property Location / Postcode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kensington, SW7"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Property Overview &amp; Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about the property, current condition, or any architectural goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-4 px-6 bg-[#07381E] hover:bg-[#052B17] text-white rounded-lg text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Discreet Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Confidential Enquiry</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-canvas-border space-y-2 text-xs text-charcoal-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-3.5 h-3.5 text-[#07381E]" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-[#07381E]">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3.5 h-3.5 text-[#07381E]" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-[#07381E]">
                  {SITE_METADATA.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-3.5 h-3.5 text-[#07381E]" />
                <span>{SITE_METADATA.address}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
