'use client';

interface HomeStatementProps {
  data?: {
    eyebrow?: string;
    headline?: string;
  };
}

export default function HomeStatement({ data }: HomeStatementProps) {
  const eyebrow = data?.eyebrow || 'ZALIA PERSPECTIVE';
  const headline = data?.headline || 'PROPERTY HAS POTENTIAL. WE SEE WHAT IT CAN BECOME.';

  return (
    <section className="relative w-full bg-canvas-warm py-24 sm:py-36 lg:py-48 border-b border-canvas-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-emerald-brand mx-auto">
          {eyebrow}
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-charcoal-950 leading-[1.04] tracking-tight">
          {headline.includes('WE SEE WHAT IT CAN BECOME') ? (
            <>
              PROPERTY HAS POTENTIAL.
              <span className="block text-emerald-brand italic font-normal mt-3">
                WE SEE WHAT IT CAN BECOME.
              </span>
            </>
          ) : (
            headline
          )}
        </h2>
      </div>
    </section>
  );
}
