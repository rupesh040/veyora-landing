"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";

import content from "../data";

const { images, badge, titleStart, titleHighlight, description, points, testimonial } = content.aboutSection;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#faf9f7] px-5 py-4 sm:px-8 md:px-10 lg:px-12 xl:px-16"
    >
      <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">
        <ImageCollage />
        <Content />
      </div>
    </section>
  );
}

function ImageCollage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto h-[420px] w-full max-w-[680px] sm:h-[510px] md:h-[570px] lg:h-[600px] xl:h-[630px]"
    >
      <div className="absolute left-0 top-0 z-0">
        <DotPattern />
      </div>

      <motion.svg
        viewBox="0 0 680 730"
        fill="none"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <motion.path
          d="M105 390 C120 480 165 560 245 625 C325 690 430 720 535 675 C585 650 575 560 555 475 C545 425 525 360 500 315"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            delay: 0.25,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[8%] top-[10%] z-10 h-[42%] w-[48%] overflow-hidden rounded-[24px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] sm:rounded-[28px]"
      >
        <Image
          src={images.main}
          alt="Veyora creative team"
          fill
          priority
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 48vw, 330px"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 35, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute right-[3%] top-[14%] z-20 h-[30%] w-[38%] overflow-hidden rounded-[19px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.1)] sm:rounded-[22px]"
      >
        <Image
          src={images.small1}
          alt="Creative strategy session"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 38vw, 270px"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30, y: 25 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-[18%] left-[18%] z-20 h-[28%] w-[36%] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.1)] sm:rounded-[22px]"
      >
        <Image
          src={images.small2}
          alt="Creative sketching"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 37vw, 260px"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 35, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-[15%] right-[0%] z-10 h-[38%] w-[42%] overflow-hidden rounded-[20px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] sm:rounded-[25px]"
      >
        <Image
          src={images.small3}
          alt="Veyora creative collaboration"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 43vw, 295px"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 1.7,
          type: "spring",
          stiffness: 180,
        }}
        className="absolute bottom-[1%] right-[5%] z-30 h-4 w-4 rotate-45 bg-[#2563eb] sm:h-5 sm:w-5"
      />
    </motion.div>
  );
}

function Content() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        className="inline-flex rounded-full border-2 border-[#2563eb] px-4 py-1.5 sm:px-6"
      >
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#2563eb]">
          {badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 max-w-[800px] text-[36px] font-bold leading-[1.04] tracking-[-0.04em] text-[#101522] sm:text-[46px] md:text-[52px] lg:text-[56px]"
      >
        <span>{titleStart}</span>
        <span className="text-[#2563eb]">
          {titleHighlight}
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.35,
        }}
        className="mt-6 max-w-[650px] text-[15px] leading-[1.6] text-[#17191f]/85 sm:text-[17px] md:text-[19px]"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.45,
        }}
        className="mt-7 space-y-4"
      >
        {points.map((point: string, index: number) => (
          <motion.div
            key={point}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.1,
            }}
            className="flex items-center gap-3.5"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10">
              <Check
                size={16}
                strokeWidth={2.5}
                className="text-[#2563eb]"
              />
            </div>

            <span className="text-base font-medium text-[#17191f] sm:text-lg">
              {point}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <Testimonial />
    </motion.div>
  );
}

function Testimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mt-9 overflow-hidden rounded-[16px] border-2 border-[#2563eb]/30 bg-white shadow-sm"
    >
      <div className="absolute left-0 top-0 flex h-7 w-9 items-center justify-center rounded-br-lg bg-[#2563eb] text-2xl font-bold text-white">
        &quot;
      </div>

      <div className="px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8 md:px-8">
        <p className="max-w-[680px] text-base font-medium leading-[1.5] text-[#17191f] sm:text-lg md:text-xl">
          &quot;{testimonial.quote}&quot;
        </p>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#2563eb]/20 bg-[#e8e5e1] sm:h-14 sm:w-14">
            <Image
              src={testimonial.authorImage}
              alt={testimonial.authorName}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          <div>
            <p className="text-base font-bold text-[#11151c] sm:text-lg">
              {testimonial.authorName}
            </p>

            <p className="text-sm text-[#17191f]/75 sm:text-base">
              {testimonial.authorTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <div className="h-0 w-0 border-b-[20px] border-l-[20px] border-b-[#2563eb] border-l-transparent" />
      </div>
    </motion.div>
  );
}

function DotPattern() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 49 }).map((_, index) => {
        const row = Math.floor(index / 7);
        const column = index % 7;

        return (
          <circle
            key={index}
            cx={column * 16 + 4}
            cy={row * 16 + 4}
            r="1.8"
            fill="#2563eb"
            opacity={0.18 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}
