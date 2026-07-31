"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PAGE_OPENER_MIN_H } from '@/components/Section';

/* The form sits on a photograph, so the fields keep their own opaque surface
   rather than inheriting the page ground. `bg-popover` is that surface in both
   themes; the scrim below darkens the photograph in dark mode so white copy
   layered on it keeps its contrast. */
const fieldClassName =
  'w-full bg-popover text-sm text-popover-foreground placeholder:text-muted-foreground px-4 rounded-lg border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset';

export default function Contact() {
  const t = useTranslations('contact');
  const contentRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lockedHeight, setLockedHeight] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const accessKey = '5f8ad34e-532c-4372-b840-f93bc9ff89a0';

    if (!accessKey) {
      setError(t('error'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          _captcha: false,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (contentRef.current) {
          setLockedHeight(contentRef.current.offsetHeight);
        }
        setSubmitted(true);
        e.target.reset();
      } else {
        setError(t('error'));
      }
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    /* `items-center` matters as much as the height: without it the card is a
       stretched flex item and grows to whatever the band is, which is where
       the dead space under the form came from. */
    <section
      className={`flex items-center justify-center w-full py-8 px-5 md:px-10 lg:px-[60px] font-sans ${PAGE_OPENER_MIN_H}`}
    >
      <div className="relative w-full max-w-[1100px] mx-auto overflow-hidden rounded-card">
        <Image
          src="/intouchBg.png"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1100px) 100vw, 1100px"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
        <div className="absolute inset-0 bg-scrim" aria-hidden="true" />

        <div
          ref={contentRef}
          className="relative"
          style={submitted && lockedHeight ? { minHeight: lockedHeight } : undefined}
        >
          {submitted ? (
            <div
              className="flex items-center justify-center p-8 md:p-10 lg:p-12"
              style={lockedHeight ? { minHeight: lockedHeight } : undefined}
            >
              <p className="text-center text-base md:text-lg text-white leading-relaxed max-w-md">
                {t('success')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 p-8 md:p-10 lg:p-12">
              <div className="flex flex-col justify-start">
                <h1 className="font-heading text-[32px] md:text-[40px] lg:text-[44px] font-medium leading-[1.05] tracking-[-0.015em] text-white">
                  {t('title')}
                </h1>
                <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed max-w-[360px]">
                  {t('subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t('message')}
                  required
                  className={`${fieldClassName} min-h-[140px] py-4 resize-none`}
                />

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t('name')}
                  required
                  className={`${fieldClassName} h-12`}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('email')}
                    required
                    className={`${fieldClassName} h-12 sm:flex-1`}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center h-12 px-8 bg-brand-brown text-primary-foreground dark:text-neutral-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    {loading ? t('submitting') : t('submit')}
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-white bg-white/10 px-4 py-2 rounded-frame">
                    {error}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
