'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_METADATA } from '@/data/content';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'residential-transformation',
    location: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
                className="rounded-full p-2.5 text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-subtle transition-colors"
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
                  <h4 className="text-2xl font-serif text-charcoal-900">Enquiry Received</h4>
                  <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed">
                    Thank you for reaching out to Zalia Properties. A member of our acquisitions and development team will review your property details and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#07381E] text-white text-xs font-medium uppercase tracking-widest hover:bg-[#052B17] transition-colors"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alexander Sterling"
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
                        required
                        type="email"
                        placeholder="alexander@domain.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 (0) 7900 000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Interest Area
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all"
                      >
                        <option value="residential-transformation">Residential Transformation</option>
                        <option value="property-acquisition">Direct Property Sale / Acquisition</option>
                        <option value="joint-venture">Joint Development Venture</option>
                        <option value="general-enquiry">General Advisory</option>
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
                      Property Overview &amp; Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the property, current condition, or any architectural goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/15 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full py-4 px-6 bg-[#07381E] hover:bg-[#052B17] text-white rounded-lg text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-md"
                  >
                    <span>Submit Confidential Inquiry</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
