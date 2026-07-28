import { useState, useCallback } from 'react';
import { db, collection, addDoc, serverTimestamp } from '@/firebase/firestore';

/**
 * Custom hook for the contact form.
 *
 * Manages form state, validation, Firestore submission, and
 * loading/success/error states. Includes spam prevention via
 * honeypot field and minimum submission time.
 *
 * @returns {object} Form state and handlers.
 */
export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false,
    _honeypot: '', // hidden field — must remain empty
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitStart, setSubmitStart] = useState(null);

  /**
   * Update a single form field.
   *
   * @param {string} field
   * @param {string | boolean} value
   */
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error on change
    setFieldErrors((prev) => {
      if (!prev[field]) { return prev; }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  /**
   * Validate form before submission.
   *
   * @returns {boolean}
   */
  const validate = useCallback(() => {
    const errors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Name is required (minimum 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'A valid email address is required.';
    }
    if (formData.phone && !/^[+\d][\d\s\-()]{6,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message is required (minimum 10 characters).';
    }
    if (!formData.consent) {
      errors.consent = 'You must agree to be contacted.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Submit the form to Firestore.
   *
   * Includes honeypot spam check and minimum submission time (3 seconds)
   * to prevent bot submissions.
   *
   * @param {Event} e — form submit event.
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // ── Spam Prevention ──────────────────────────
      // Honeypot — if filled, silently reject
      if (formData._honeypot) {
        setStatus('success'); // fake success to not reveal detection
        return;
      }

      // Minimum submission time (3s) — bots submit instantly
      const now = Date.now();
      if (submitStart && now - submitStart < 3000) {
        setErrorMessage('Please wait a moment before submitting.');
        setStatus('error');
        return;
      }

      if (!validate()) { return; }

      setStatus('loading');
      setErrorMessage('');
      setSubmitStart(now);

      try {
        await addDoc(collection(db(), 'contact_submissions'), {
          name: formData.name.trim(),
          company: formData.company.trim() || null,
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          service: formData.service || null,
          message: formData.message.trim(),
          consent: true,
          submittedAt: serverTimestamp(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
          source: 'website_contact_form',
        });

        setStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          consent: false,
          _honeypot: '',
        });
      } catch (err) {
        console.error('Contact form submission failed:', err);
        setStatus('error');
        setErrorMessage(
          'Something went wrong while sending your message. Please try again or contact us directly by phone or email.',
        );
      }
    },
    [formData, validate, submitStart],
  );

  return {
    formData,
    status,
    errorMessage,
    fieldErrors,
    handleChange,
    handleSubmit,
  };
}

/**
 * Service options for the dropdown.
 */
export const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  { value: 'Static Security Guards', label: 'Static Security Guards' },
  { value: 'Mobile Patrol Services', label: 'Mobile Patrol Services' },
  { value: 'Event Security', label: 'Event Security' },
  { value: 'VIP Protection', label: 'VIP Protection' },
  { value: 'CCTV Monitoring', label: 'CCTV Monitoring' },
  { value: 'Access Control', label: 'Access Control' },
  { value: 'Reception Security', label: 'Reception Security' },
  { value: 'Industrial Security', label: 'Industrial Security' },
  { value: 'Commercial Security', label: 'Commercial Security' },
  { value: 'Residential Security', label: 'Residential Security' },
  { value: 'Other / Multiple', label: 'Other / Multiple Services' },
];
