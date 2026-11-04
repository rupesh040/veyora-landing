"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import content from "@/src/data";

const hero = content.hero;

const ACCENT = hero.theme?.accent || "#2563EB";
const BG_COLOR = hero.theme?.background || "#F8FAFC";
const HEADING_COLOR = hero.theme?.headingText || "#101522";
const BODY_COLOR = hero.theme?.bodyText || "#20242c";
const DOTS_COLOR = hero.theme?.dots || ACCENT;
const CIRCLE_COLOR = hero.theme?.circle || ACCENT;
const TRIANGLE_COLOR = hero.theme?.triangle || ACCENT;

function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const y = useSpring(mouseY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return { x, y };
}

function DotPattern({
  cols = 7,
  rows = 7,
  gap = 18,
  r = 1.5,
  color = DOTS_COLOR,
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  r?: number;
  color?: string;
}) {
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <circle
            key={i}
            cx={col * gap + gap / 2}
            cy={row * gap + gap / 2}
            r={r}
            fill={color}
            opacity={0.18 + ((row + col) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { x, y } = useMouseParallax();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cx1 = useTransform(x, (v) => v * -5);
  const cy1 = useTransform(y, (v) => v * -5);
  const cx2 = useTransform(x, (v) => v * 9);
  const cy2 = useTransform(y, (v) => v * 9);
  const cx3 = useTransform(x, (v) => v * 14);
  const cy3 = useTransform(y, (v) => v * 14);
  const cx4 = useTransform(x, (v) => v * 7);
  const cy4 = useTransform(y, (v) => v * 7);

  const p1 = isMounted ? { x: cx1, y: cy1 } : undefined;
  const p2 = isMounted ? { x: cx2, y: cy2 } : undefined;
  const p3 = isMounted ? { x: cx3, y: cy3 } : undefined;
  const p4 = isMounted ? { x: cx4, y: cy4 } : undefined;

  return (
    <section
      id="hero"
      style={{ backgroundColor: BG_COLOR }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative mx-auto overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-20">
        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute -right-[10%] top-[12%] z-0 h-[500px] w-[500px] rounded-full blur-[2px] sm:h-[680px] sm:w-[680px] lg:h-[760px] lg:w-[760px]"
          style={{
            ...p1,
            backgroundColor: `${ACCENT}0D`,
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute -right-[8%] top-[10%] z-0 hidden sm:block"
          style={p1}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 1.2, delay: 0.3 },
            scale: { duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        >
          <svg
            width="580"
            height="580"
            viewBox="0 0 580 580"
            fill="none"
            aria-hidden="true"
            className="h-[420px] w-[420px] sm:h-[460px] sm:w-[460px] lg:h-[580px] lg:w-[580px]"
          >
            <circle
              cx="290"
              cy="290"
              r="270"
              stroke={CIRCLE_COLOR}
              strokeWidth="1"
              strokeDasharray="12 22"
              opacity="0.18"
            />
            <circle
              cx="290"
              cy="290"
              r="230"
              stroke={CIRCLE_COLOR}
              strokeWidth="0.6"
              strokeDasharray="4 28"
              opacity="0.09"
            />
          </svg>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute right-[26%] top-[2%] z-0 hidden sm:block"
          style={p2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            rotate: {
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        >
          <svg
            width="160"
            height="140"
            viewBox="0 0 160 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 133L150 8H22L10 133Z"
              fill={TRIANGLE_COLOR}
              opacity="0.045"
            />
            <motion.path
              d="M10 133L150 8H22L10 133Z"
              stroke={ACCENT}
              strokeWidth="1.2"
              opacity="0.22"
              fill="none"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.22 }}
              transition={{
                duration: 1.6,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute -bottom-[6%] -left-[4%] z-0 hidden md:block"
          style={p2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        >
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 340 340 A 280 280 0 0 1 60 60"
              stroke={ACCENT}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.14"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.path
              d="M 340 340 A 240 240 0 0 1 100 100"
              stroke={ACCENT}
              strokeWidth="0.7"
              strokeDasharray="5 15"
              strokeLinecap="round"
              fill="none"
              opacity="0.09"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.2,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute right-[20%] top-[60%] z-0 hidden xl:block"
          style={p3}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.svg
            width="48"
            height="54"
            viewBox="0 0 48 54"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <motion.path
              d="M24 2 L46 14 L46 40 L24 52 L2 40 L2 14 Z"
              stroke={ACCENT}
              strokeWidth="1"
              fill="none"
              opacity="0.22"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                delay: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute left-0 top-[5%] z-0 hidden lg:block"
          style={p3}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.5 },
            x: { duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M0 50 L50 100 L100 50"
              stroke={ACCENT}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.16"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.path
              d="M0 34 L34 68 L68 34"
              stroke={ACCENT}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.09"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute right-[1%] top-0 z-0 hidden sm:block"
          style={p4}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: [0, 14, 0] }}
          transition={{
            opacity: { duration: 1, delay: 0.4 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <DotPattern cols={7} rows={7} gap={18} r={1.6} color={DOTS_COLOR} />
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute bottom-[2%] left-[46%] z-0 hidden md:block"
          style={p4}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.55, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.6 },
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <DotPattern cols={6} rows={4} gap={16} r={1.3} color={DOTS_COLOR} />
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute left-[52%] top-[20%] z-0 hidden lg:block"
          style={p4}
          animate={{
            opacity: [0.18, 0.5, 0.18],
            scale: [0.92, 1.08, 0.92],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `${ACCENT}66` }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `${ACCENT}40` }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `${ACCENT}26` }}
            />
          </div>
        </motion.div>

        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute right-[7%] top-[20%] z-0 hidden lg:block"
          style={p1}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width="480"
            height="480"
            viewBox="0 0 480 480"
            aria-hidden="true"
            fill="none"
          >
            <motion.circle
              cx="240"
              cy="16"
              r="5"
              fill={ACCENT}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.35, 0.75, 0.35],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <circle
              cx="240"
              cy="240"
              r="224"
              stroke={ACCENT}
              strokeWidth="0.5"
              strokeDasharray="3 40"
              opacity="0.06"
            />
          </svg>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 items-center lg:grid-cols-[50%_50%] xl:grid-cols-[52%_48%]">
          <div className="order-1 relative flex w-full items-center justify-center pt-6 sm:pt-8 lg:order-2 lg:h-full lg:pt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px] lg:w-full lg:max-w-[540px] xl:max-w-[600px]">
              <motion.div
                suppressHydrationWarning
                className="relative h-[300px] w-full sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[580px]"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={hero.person.image}
                  alt={hero.person.alt}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 330px, (max-width: 768px) 420px, (max-width: 1024px) 480px, (max-width: 1280px) 50vw, 48vw"
                />

                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 sm:h-36 lg:hidden"
                  style={{
                    background: `linear-gradient(to top, #EFF6FF 0%, #EFF6FF 10%, transparent 100%)`,
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>

          <div className="order-2 flex min-w-0 flex-col justify-center pb-6 pt-2 sm:pb-8 sm:pt-4 lg:order-1 lg:py-8">
            <motion.div
              suppressHydrationWarning
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3.5 sm:mb-7 sm:gap-4"
            >
              <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                <Image
                  src={hero.logo.image}
                  alt={hero.logo.alt}
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>

              <span
                style={{ color: ACCENT }}
                className="text-sm font-medium sm:text-base md:text-lg"
              >
                {hero.brandTag}
              </span>
            </motion.div>

            <motion.h1
              suppressHydrationWarning
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ color: HEADING_COLOR }}
              className="text-[60px] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              <span className="block">{hero.heading.line1}</span>
              <span className="mt-1 block sm:mt-2">{hero.heading.line2}</span>
            </motion.h1>

            <motion.p
              suppressHydrationWarning
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ color: BODY_COLOR }}
              className="mt-5 max-w-[580px] text-[14px] leading-[1.55] sm:mt-7 sm:text-[17px] sm:leading-[1.55] lg:mt-8 lg:text-[19px]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              suppressHydrationWarning
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 sm:mt-9"
            >
              <Link
                href={hero.cta.href}
                onClick={(e) => {
                  if (hero.cta.href.startsWith("#")) {
                    e.preventDefault();
                    const el = document.getElementById(hero.cta.href.slice(1));
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", hero.cta.href);
                    }
                  }
                }}
                style={{ backgroundColor: ACCENT }}
                className="group inline-flex items-center justify-center gap-4 rounded-md px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-1 hover:brightness-95 hover:shadow-[0_14px_40px_rgba(37,99,235,0.3)] sm:px-8 sm:py-3.5 sm:text-base lg:px-9 lg:py-4 lg:text-lg"
              >
                <span>{hero.cta.label}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}