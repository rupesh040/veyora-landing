"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Target,
  Gem,
  User,
  LayoutTemplate,
  PenLine,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import contentData from "@/src/data";
import type { CoreFeaturesData, CoreFeatureItem } from "@/src/types/content";

const iconMap: Record<string, any> = {
  Target,
  Gem,
  User,
  LayoutTemplate,
  PenLine,
  Briefcase,
};

const coreData = contentData.coreFeatures as CoreFeaturesData;
const leftFeatures = coreData.features.slice(0, 3);
const rightFeatures = coreData.features.slice(3, 6);

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CoreFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16">
      <BackgroundShapes />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <Header />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_430px_1fr] lg:gap-7 xl:grid-cols-[1fr_500px_1fr] xl:gap-10">
          <FeatureColumn items={leftFeatures} side="left" />

          <CenterVisual />

          <FeatureColumn items={rightFeatures} side="right" />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto max-w-[800px] text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7"
      >
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
          {coreData.badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 text-[56px] font-bold leading-[1.03] tracking-[-0.05em] text-[#101522]"
      >
        {coreData.heading.line1}
        <br />
        {coreData.heading.line2} <span className="text-[#d8003f]">{coreData.heading.highlight}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.35,
        }}
        className="mx-auto mt-5 max-w-[650px] text-[15px] leading-[1.45] text-[#17191f] sm:text-[17px] md:text-[19px]"
      >
        {coreData.description}
      </motion.p>
    </motion.div>
  );
}

function FeatureColumn({
  items,
  side,
}: {
  items: CoreFeatureItem[];
  side: "left" | "right";
}) {
  return (
    <div className="relative z-20 flex flex-col gap-4 sm:gap-5">
      {items.map((feature, index) => {
        const Icon = (feature.icon && iconMap[feature.icon]) || Target;

        return (
          <motion.div
            key={feature.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
              },
            }}
            className={`group relative flex min-h-[120px] items-center rounded-[15px] border border-black/[0.04] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(16,21,34,0.09)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(16,21,34,0.14)] sm:min-h-[130px] sm:px-6 lg:px-6 ${
              side === "left"
                ? "lg:translate-x-1"
                : "lg:-translate-x-1"
            }`}
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#11151c] sm:h-14 sm:w-14">
                {feature.iconSvg ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:scale-110"
                    dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                  />
                ) : (
                  <Icon
                    size={38}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold leading-tight tracking-[-0.02em] text-[#11151c] md:text-lg">
                  {feature.title}
                </h3>

                <p className="mt-1.5 max-w-[320px] pr-6 text-sm leading-[1.4] text-[#17191f]">
                  {feature.description}
                </p>
              </div>

              <ArrowRight
                size={20}
                strokeWidth={1.7}
                className="absolute bottom-4 right-4 text-[#17191f] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#d8003f]"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CenterVisual() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.88,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center py-4 sm:py-6 lg:py-0 xl:max-w-[490px]"
    >
      <motion.div
        animate={{
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[24%] bg-[#f7d7da]"
      />

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 aspect-square w-[78%] overflow-hidden rounded-[24%] shadow-[0_16px_45px_rgba(216,0,63,0.16)]"
      >
        <Image
          src={coreData.centerImage}
          alt="VEYORA creative team"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 70vw, 500px"
        />

        <div className="pointer-events-none absolute inset-0 rounded-[24%] border-[5px] border-white/80" />
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-5 -left-8 z-30 hidden sm:block"
      >
        <DotPattern />
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.45, 0.75, 0.45],
          y: [0, -7, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-5 top-0 z-30 hidden sm:block"
      >
        <DotPattern />
      </motion.div>
    </motion.div>
  );
}

function DotPattern() {
  return (
    <svg
      width="105"
      height="105"
      viewBox="0 0 105 105"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 49 }).map((_, index) => {
        const row = Math.floor(index / 7);
        const column = index % 7;

        return (
          <circle
            key={index}
            cx={column * 15 + 4}
            cy={row * 15 + 4}
            r="1.5"
            fill="#d8003f"
            opacity={0.22 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}

function BackgroundShapes() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 12, 0],
          y: [0, -8, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-10 top-16 h-44 w-32 rotate-[28deg] rounded-[35%] bg-[#f5cfd4]/45 sm:left-0 sm:h-56 sm:w-40"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -right-20 top-[15%] h-72 w-72 rounded-full border-[2px] border-[#e9b8bf]/25"
      />

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[-130px] left-[35%] h-80 w-80 rounded-full bg-[#f9dfe2]/40 blur-[2px]"
      />

      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(216,0,63,0.08)_1px,transparent_1px)] [background-size:90px_90px]" />
    </>
  );
}