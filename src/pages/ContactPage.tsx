import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('pitch');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'info');
      return;
    }

    const generatedId = `KBZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setSubmitted(true);
    showToast('Editorial pitch received! Thank you.', 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setTopic('pitch');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-500">
          <Mail className="h-3.5 w-3.5" />
          <span>Editorial Desk & Inquiries</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          Pitch a Story or Contact the Masthead
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[var(--text-secondary)] leading-relaxed">
          We welcome pitches from tactical analysts, sports economists, and cultural chroniclers worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form Area */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-950/10 p-8 text-center space-y-4 shadow-xl shadow-[var(--shadow-color)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">Inquiry Recorded</h3>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                Reference ID: <strong className="text-[var(--text-primary)]">{ticketId}</strong>
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-[var(--text-primary)]">{name}</strong>. Your pitch regarding{' '}
                <span className="text-blue-500 font-semibold">{topic}</span> has been staged for the editorial board review.
              </p>
              <div className="rounded-xl bg-[var(--bg-subtle)] p-4 text-xs text-[var(--text-muted)] text-left border border-[var(--border-subtle)]">
                <span className="font-semibold text-[var(--text-primary)]">Front-End Note:</span> This is a realistic interactive client-side simulation. No actual remote emails were dispatched.
              </div>
              <button
                onClick={handleReset}
                className="mt-4 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all cursor-pointer"
              >
                Submit Another Pitch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xl shadow-[var(--shadow-color)] space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jonathan Carter"
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Inquiry Topic / Category *
                </label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="Tactical Pitch">Pitch a Tactical Analysis / Essay</option>
                  <option value="Transfer Investigation">Transfer & Scouting Intelligence</option>
                  <option value="Media & Press">Press / Media Collaboration</option>
                  <option value="Reader Perspective">Reader Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Your Message or Abstract *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline your article pitch, thesis statement, or message in detail..."
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-98 cursor-pointer"
              >
                <span>Transmit Pitch to Editors</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Bureaus & Guidelines Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>Editorial Bureaus</span>
            </h3>
            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              <div className="rounded-xl bg-[var(--bg-subtle)] p-3 border border-[var(--border-subtle)]">
                <span className="font-semibold text-[var(--text-primary)]">London Hub:</span> 12 Dean Street, Soho, London W1D 3RF
              </div>
              <div className="rounded-xl bg-[var(--bg-subtle)] p-3 border border-[var(--border-subtle)]">
                <span className="font-semibold text-[var(--text-primary)]">Madrid Desk:</span> Paseo de la Castellana 89, 28046 Madrid
              </div>
              <div className="rounded-xl bg-[var(--bg-subtle)] p-3 border border-[var(--border-subtle)]">
                <span className="font-semibold text-[var(--text-primary)]">Milan Bureau:</span> Via Dante 14, 20121 Milano
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Pitch Guidelines</span>
            </h3>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>• Focus on data-grounded tactical concepts or historical cultural narratives.</li>
              <li>• Include 2-3 specific game timestamps or tactical diagrams if applicable.</li>
              <li>• Editorial reviews occur weekly on Monday morning.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
