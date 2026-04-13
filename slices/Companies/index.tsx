'use client';

import { FC, useCallback, useEffect, useRef, type PointerEvent } from 'react';
import { Content, ImageField, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type CompaniesProps = SliceComponentProps<Content.CompaniesSlice>;

type CompanyRow = {
  company_logo: ImageField<never>;
};

const AUTO_SCROLL_PX_PER_SEC = 28;

function renderLogoCells(
  logos: readonly CompanyRow[],
  keyPrefix: string,
  ariaHidden?: boolean
) {
  return logos.map((row) => {
    const logo = row.company_logo;
    if (!isFilled.image(logo)) return null;
    return (
      <div
        key={`${keyPrefix}-${logo.url}`}
        className="flex h-[80px] shrink-0 items-center justify-center px-2 sm:px-4"
        aria-hidden={ariaHidden}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Prismic CDN logos */}
        <img
          src={logo.url}
          alt={ariaHidden ? '' : (logo.alt ?? 'Partner company logo')}
          width={logo.dimensions?.width ?? 200}
          height={logo.dimensions?.height ?? 80}
          className="h-[80px] max-h-[80px] w-auto max-w-[240px] object-contain"
          draggable={false}
        />
      </div>
    );
  });
}

function CompanyLogoScroller({ logos }: { logos: readonly CompanyRow[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripARef = useRef<HTMLDivElement>(null);

  const offsetPx = useRef(0);
  const isDragging = useRef(false);
  const pauseAutoScroll = useRef(false);
  const dragStart = useRef({ x: 0, offset: 0 });

  const measureLoopWidth = useCallback((): number => {
    const strip = stripARef.current;
    const track = trackRef.current;
    if (!strip || !track) return 0;
    const gapRaw = getComputedStyle(track).columnGap;
    const gap = Number.parseFloat(gapRaw) || 0;
    return strip.offsetWidth + gap;
  }, []);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetPx.current}px,0,0)`;
  }, []);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    isDragging.current = true;
    pauseAutoScroll.current = true;
    dragStart.current = { x: e.clientX, offset: offsetPx.current };
    el.style.cursor = 'grabbing';
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !viewportRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    offsetPx.current = dragStart.current.offset + dx;
    applyTransform();
  }, [applyTransform]);

  const endDrag = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    isDragging.current = false;
    pauseAutoScroll.current = false;
    el.style.cursor = 'grab';
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  useEffect(() => {
    if (logos.length === 0) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const loopW = measureLoopWidth();
      if (loopW > 0) {
        if (!pauseAutoScroll.current && !isDragging.current) {
          offsetPx.current -= AUTO_SCROLL_PX_PER_SEC * dt;
        }
        while (offsetPx.current <= -loopW) {
          offsetPx.current += loopW;
        }
        while (offsetPx.current > 0) {
          offsetPx.current -= loopW;
        }
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [logos.length, measureLoopWidth, applyTransform]);

  useEffect(() => {
    const strip = stripARef.current;
    if (!strip || logos.length === 0) return;

    const ro = new ResizeObserver(() => {
      applyTransform();
    });
    ro.observe(strip);
    return () => ro.disconnect();
  }, [logos.length, applyTransform]);

  if (logos.length === 0) {
    return (
      <p className="px-6 text-center text-sm text-gray-500">
        Add company logos in the Prismic Companies slice.
      </p>
    );
  }

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        'w-full min-w-0 max-w-full cursor-grab overflow-x-hidden py-2 select-none',
        'touch-pan-y'
      )}
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-12 will-change-transform md:gap-16"
      >
        <div
          ref={stripARef}
          className="flex shrink-0 gap-12 md:gap-16"
        >
          {renderLogoCells(logos, 'a', false)}
        </div>
        <div
          className="flex shrink-0 gap-12 md:gap-16"
          aria-hidden
        >
          {renderLogoCells(logos, 'b', true)}
        </div>
      </div>
    </div>
  );
}

const Companies: FC<CompaniesProps> = ({ slice }) => {
  const companies = slice.primary.companies ?? [];
  const logos = companies.filter((row) => isFilled.image(row.company_logo));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-white py-10 md:py-12')}
      aria-label="Partner companies"
    >
      <SliceEntrance>
        <div className="w-full min-w-0 px-4 md:px-6 lg:px-10">
          <CompanyLogoScroller logos={logos} />
        </div>
      </SliceEntrance>
    </section>
  );
};

export default Companies;
