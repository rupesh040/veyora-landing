"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import contentData from "@/src/data";
import type { WhyVeyoraData } from "@/src/types/content";

const whyData = contentData.whyVeyora as WhyVeyoraData;

function AnimatedMetric({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const duration = 1600;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1,
      );

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(easeProgress * percentage));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(percentage);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, percentage]);

  return (
    <div ref={ref}>
      <div className="mb-2.5 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-[#17191e] sm:text-lg">
          {label}
        </span>

        <span className="font-mono text-base font-bold text-[#17191e] sm:text-lg">
          {count}%
        </span>
      </div>

      <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e8e5e2]">
        <motion.div
          initial={{ width: "0%" }}
          animate={
            isInView
              ? {
                  width: `${percentage}%`,
                }
              : {
                  width: "0%",
                }
          }
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#df182f] to-[#ff2b49] shadow-[0_0_12px_rgba(223,24,47,0.35)]"
        />
      </div>
    </div>
  );
}

export default function WhyVeyora() {
  const tabsList = Object.keys(whyData.tabs);

  const [activeTab, setActiveTab] = useState<string>(
    tabsList[0] || "Clarity",
  );

  const activeContent =
    whyData.tabs[activeTab] || whyData.tabs[tabsList[0]];

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16">
      <div className="pointer-events-none absolute -bottom-28 right-[34%] h-64 w-40 rotate-[-28deg] border-[28px] border-[#f7d6d9]/60 sm:h-80 sm:w-48" />

      <div className="relative mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-12 xl:grid-cols-[1.35fr_0.9fr] xl:gap-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-w-0"
        >
          <div className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
              {whyData.badge}
            </span>
          </div>

          <h2 className="mt-6 max-w-[760px] text-[56px] font-bold leading-[1] tracking-[-0.04em] text-[#10151f]">
            {whyData.heading.line1}
            <br />
            {whyData.heading.line2}{" "}
            <span className="text-[#df182f]">
              {whyData.heading.highlight}
            </span>
          </h2>

          <p className="mt-6 max-w-[670px] text-[15px] font-medium leading-[1.5] text-[#171a20] sm:mt-7 sm:text-[17px] sm:leading-[1.45] xl:text-[19px]">
            {whyData.description}
          </p>

          <div className="mt-8 max-w-[660px]">
            <div className="grid grid-cols-3 border-b-2 border-[#ed1028]">
              {tabsList.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative cursor-pointer px-3 py-3 text-sm font-bold transition-all duration-300 sm:px-5 sm:text-[17px] ${
                    activeTab === tab
                      ? "bg-[#ed1028] text-white"
                      : "bg-transparent text-[#16191f] hover:text-[#ed1028]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(230px,320px)_1fr] sm:items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative aspect-[1.4/1] overflow-hidden rounded-[14px] bg-black/5 shadow-md"
                >
                  <Image
                    src={activeContent.image}
                    alt={`Veyora ${activeTab}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-black/10" />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-points`}
                  initial={{
                    opacity: 0,
                    x: 15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -15,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-4 sm:space-y-4.5"
                >
                  {activeContent.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3.5 text-[15px] font-medium leading-[1.35] text-[#15181d] sm:text-[17px]"
                    >
                      <Check
                        size={20}
                        strokeWidth={3}
                        className="mt-0.5 shrink-0 text-[#e21731]"
                      />

                      <span>{point}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-metrics`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 space-y-5"
              >
                {whyData.metrics.map((metric) => (
                  <AnimatedMetric
                    key={`${activeTab}-${metric.label}`}
                    label={metric.label}
                    percentage={metric.percentage}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.85,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[18px] bg-[#101318] px-7 py-8 text-white shadow-2xl self-start lg:sticky lg:top-32 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-11"
        >
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_26%,transparent_26%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_51%,transparent_51%)] [background-size:90px_90px]" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border-[35px] border-white/[0.025]" />

          <div className="relative flex h-full flex-col">
            <div className="mb-8 flex items-center">
              <div className="relative h-36 w-36 sm:h-40 sm:w-40">
                <Image
                  src={whyData.card.logos.backdrop}
                  alt={whyData.card.logos.backdropAlt}
                  fill
                  className="object-contain grayscale opacity-75"
                  sizes="80px"
                />
              </div>

              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <Image
                  src={whyData.card.logos.primary}
                  alt={whyData.card.logos.primaryAlt}
                  fill
                  className="object-contain "
                  sizes="80px"
                />
              </div>
            </div>

            <div className="flex-1">
              {whyData.card.reasons.map((reason, index) => (
                <motion.div
                  key={reason.number}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="py-6 first:pt-2 last:pb-4"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <span className="shrink-0 font-mono text-[24px] font-medium tracking-tight text-white/90 sm:text-[27px]">
                      {reason.number}
                    </span>

                    <div>
                      <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[25px]">
                        {reason.title}
                      </h3>

                      <p className="mt-2.5 max-w-[390px] text-[15px] leading-[1.5] text-white/75 sm:text-[17px]">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-4">
              <a
                href={whyData.card.cta.href}
                className="group inline-flex items-center justify-center gap-4 rounded-full border border-white/80 px-7 py-3.5 text-base font-medium transition-all duration-300 hover:border-[#e31837] hover:bg-[#e31837] sm:px-9 sm:text-lg"
              >
                <span>{whyData.card.cta.label}</span>

                <ArrowRight
                  size={22}
                  className="text-[#e31837] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}