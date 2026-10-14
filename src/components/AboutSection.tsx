"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Database, ShieldCheck } from "lucide-react";

import content from '../data';
const { images, badge, titleStart, titleHighlight, description, features, stats, cta } = content.aboutSection;

const iconMap: Record<string, any> = {
  Database,
  ShieldCheck,
};

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f7] px-5 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8 lg:px-12 lg:py-10 xl:px-16">
      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-12 lg:grid-cols-[54%_46%] lg:gap-8 xl:gap-12">
        <PinterestGallery />
        <AboutContent />
      </div>
    </section>
  );
}

function PinterestGallery() {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
        aria-hidden="true"
      >
        <span className="block select-none font-sans text-[220px] font-black leading-none tracking-tighter text-[#d8003f]/[0.06] sm:text-[360px] md:text-[440px] lg:text-[560px]">
          V
        </span>
      </motion.div>

      <div className="relative z-10 grid grid-cols-[1.12fr_1fr] items-center gap-3 sm:gap-5 lg:gap-6">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute -top-7 left-0 z-0 sm:-top-10 lg:-top-12"
          >
            <DotPattern cols={6} rows={5} gap={13} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -35, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative z-10 mt-6 overflow-hidden rounded-[16px] bg-white shadow-[0_20px_50px_rgba(16,21,34,0.12)] sm:mt-10 sm:rounded-[20px] lg:mt-14 lg:rounded-[24px]"
          >
            <div className="relative aspect-[0.82/1] w-full">
              <Image
                src={images.main}
                alt="Creative team collaborating"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 52vw, (max-width: 1024px) 30vw, 24vw"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: 35, y: -25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-[16px] bg-white shadow-[0_18px_42px_rgba(0,0,0,0.1)] sm:rounded-[20px] lg:rounded-[24px]"
          >
            <div className="relative aspect-[0.92/1] w-full">
              <Image
                src={images.top}
                alt="Creative team working together"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 24vw, 20vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-[16px] bg-white shadow-[0_18px_42px_rgba(0,0,0,0.1)] sm:rounded-[20px] lg:rounded-[24px]"
          >
            <div className="relative aspect-[0.92/1] w-full">
              <Image
                src={images.bottom}
                alt="Creative team planning a project"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 24vw, 20vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-10 w-full lg:pl-6 xl:pl-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
        }}
        className="mb-6 inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:mb-7 sm:px-7"
      >
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
          {badge}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
        className="text-[56px] font-bold leading-[1] tracking-[-0.045em]"
      >
        <span>{titleStart}</span>
        <span className="text-[#d8003f]">{titleHighlight}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.25,
        }}
        className="mt-6 max-w-[590px] text-[15px] leading-[1.55] text-[#17191f] sm:mt-7 sm:text-[17px] md:text-[19px]"
      >
        {description}
      </motion.p>

      <div className="mt-8 flex flex-col gap-7 sm:mt-9 sm:gap-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-5">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="flex items-center gap-4 sm:gap-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <Icon
                    size={29}
                    strokeWidth={1.7}
                    className="text-[#d8003f]"
                  />
                </div>

                <span className="text-base font-semibold text-[#15171c] sm:text-lg md:text-xl">
                  {feature.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        <AnimatedCounter
          target={stats.target}
          suffix={stats.suffix}
          label={stats.label}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.45,
        }}
        className="mt-8 sm:mt-9"
      >
        <Link
          href={cta.link}
          className="group inline-flex items-center gap-6 rounded-md bg-[#d8003f] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(216,0,63,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#c60039] hover:shadow-[0_15px_40px_rgba(216,0,63,0.3)] sm:gap-8 sm:px-9 sm:py-[17px] sm:text-base md:text-lg"
        >
          <span>{cta.text}</span>

          <ArrowRight
            size={22}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const duration = 1800;

    const animateCounter = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounter);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animateCounter);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, target]);

  const formattedCount = count.toString().padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className="flex items-center gap-4"
    >
      <span className="min-w-[95px] text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[#d8003f] sm:min-w-[115px]">
        {formattedCount}
        {suffix}
      </span>

      <span className="max-w-[130px] text-sm font-medium leading-tight text-[#17191f] sm:text-base md:text-lg">
        {label}
      </span>
    </motion.div>
  );
}

function DotPattern({
  cols = 7,
  rows = 7,
  gap = 15,
  r = 1.6,
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  r?: number;
}) {
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }).map((_, index) => {
        const row = Math.floor(index / cols);
        const column = index % cols;

        return (
          <circle
            key={index}
            cx={column * gap + gap / 2}
            cy={row * gap + gap / 2}
            r={r}
            fill="#d8003f"
            opacity={0.18 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}