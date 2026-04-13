'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

type SliceEntranceGroupContextValue = { active: boolean };

const SliceEntranceGroupContext =
  createContext<SliceEntranceGroupContextValue | null>(null);

const IO_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.06,
};

type SliceEntranceGroupProps = {
  children: ReactNode;
  className?: string;
};

/**
 * One intersection target for the whole block. Child `SliceEntrance` components
 * use the shared `active` flag so stagger delays stay in sync (e.g. hero columns).
 */
export function SliceEntranceGroup({ children, className }: SliceEntranceGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, IO_OPTIONS);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SliceEntranceGroupContext.Provider value={{ active }}>
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    </SliceEntranceGroupContext.Provider>
  );
}

type SliceEntranceProps = {
  children: ReactNode;
  className?: string;
  /** Horizontal entrance direction (default: from the left). */
  from?: 'left' | 'right';
  /** Wait (ms) after the slice is in view before this block’s transition runs (stagger). */
  delayMs?: number;
};

const OFFSET = '2.5rem'; /* ~Tailwind translate-x-10 */

/**
 * Slides content in from the side (with opacity) when the slice enters the viewport (once).
 * Inside `SliceEntranceGroup`, follows the group’s single trigger instead.
 * Uses inline `transform` so motion is not dropped by Tailwind class scanning.
 * Reduced motion: see `globals.css` `[data-slice-entrance]`.
 */
export function SliceEntrance({
  children,
  className,
  from = 'left',
  delayMs = 0,
}: SliceEntranceProps) {
  const group = useContext(SliceEntranceGroupContext);
  const ref = useRef<HTMLDivElement>(null);
  const [selfVisible, setSelfVisible] = useState(false);

  useEffect(() => {
    if (group !== null) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSelfVisible(true);
        observer.disconnect();
      }
    }, IO_OPTIONS);

    observer.observe(el);
    return () => observer.disconnect();
  }, [group]);

  const visible = group !== null ? group.active : selfVisible;

  const offset = from === 'right' ? OFFSET : `-${OFFSET}`;

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate3d(0,0,0)' : `translate3d(${offset},0,0)`,
    transition: 'opacity 700ms ease-out, transform 700ms ease-out',
    transitionDelay: visible ? `${delayMs}ms` : '0ms',
    willChange: visible ? 'auto' : 'transform, opacity',
  };

  return (
    <div
      ref={ref}
      data-slice-entrance
      className={cn(className)}
      style={style}
    >
      {children}
    </div>
  );
}
