import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { Send } from 'lucide-react';

export default function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;

  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast.error(tx.captchaMsg);
      return;
    }

    if (!formRef.current) return;
    setIsSending(true);

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${import.meta.env.VITE_FORMSUBMIT_EMAIL}`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        }
      );

      if (res.ok) {
        toast.success(tx.successMsg);
        formRef.current.reset();
        recaptchaRef.current?.reset();
        setIsVerified(false);
      } else {
        toast.error(tx.errorMsg);
      }
    } catch {
      toast.error(tx.unexpectedError);
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none transition-all duration-300 focus:ring-2';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  return (
    <section id="contato" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[300px] opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #0ea5e9, transparent)' }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 text-center"
          style={{ letterSpacing: '0.2em' }}
        >
          — {tx.title}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-3 text-center"
        >
          {tx.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-slate-400 text-lg mb-12 text-center"
        >
          {tx.subtitle}
        </motion.p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(0,212,255,0.05)',
          }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="_honey" className="hidden" />
            <input type="hidden" name="_captcha" value="false" />

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  {tx.firstName}
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="John"
                  onFocus={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(0,212,255,0.5)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(0,212,255,0.1)';
                  }}
                  onBlur={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  {tx.lastName}
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Doe"
                  onFocus={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(0,212,255,0.5)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(0,212,255,0.1)';
                  }}
                  onBlur={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  {tx.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  pattern="\+?[0-9\s\-()]{10,20}"
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="+55 11 91234-5678"
                  onFocus={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(0,212,255,0.5)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(0,212,255,0.1)';
                  }}
                  onBlur={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  {tx.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="you@email.com"
                  onFocus={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(0,212,255,0.5)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(0,212,255,0.1)';
                  }}
                  onBlur={e => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                {tx.message}
              </label>
              <textarea
                name="message"
                rows={4}
                maxLength={500}
                required
                className={inputClass}
                style={{ ...inputStyle, resize: 'none' }}
                placeholder={tx.messagePlaceholder}
                onFocus={e => {
                  (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(0,212,255,0.5)';
                  (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 2px rgba(0,212,255,0.1)';
                }}
                onBlur={e => {
                  (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
                }}
              />
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                theme="dark"
                onChange={() => setIsVerified(true)}
                onExpired={() => setIsVerified(false)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className="group w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                color: '#000',
                boxShadow: '0 0 30px rgba(0,212,255,0.25)',
              }}
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {tx.sending}
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  {tx.submit}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
