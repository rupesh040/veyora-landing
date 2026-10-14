"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import contentData from "@/src/data";
import type { TestimonialsData, TestimonialItem } from "@/src/types/content";

const testimonialsData = contentData.testimonials as TestimonialsData;
const testimonials = testimonialsData.items;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % total);
  };

  const previousSlide = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  const visibleTestimonials = [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + total) % total;

    return {
      ...testimonials[index],
      position: offset,
      originalIndex: index,
    };
  });

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-[#faf9f7] px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16"
    >
      <BackgroundDecorations />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <Header
          data={testimonialsData}
          onPrevious={previousSlide}
          onNext={nextSlide}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 lg:mt-14"
        >
          {/* Desktop 3D Perspective Carousel */}
          <div
            style={{ perspective: 1200 }}
            className="hidden items-center justify-center gap-5 lg:flex xl:gap-8"
          >
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={`desktop-slot-${testimonial.position}`}
                animate={{
                  opacity: testimonial.position === 0 ? 1 : 0.72,
                  scale: testimonial.position === 0 ? 1.03 : 0.94,
                  rotateY:
                    testimonial.position === 0
                      ? 0
                      : testimonial.position === -1
                        ? 6
                        : -6,
                  z: testimonial.position === 0 ? 30 : -20,
                  y: testimonial.position === 0 ? -6 : 6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                }}
                onClick={() => {
                  if (testimonial.position === -1) previousSlide();
                  if (testimonial.position === 1) nextSlide();
                }}
                className={`w-full max-w-[420px] transition-shadow duration-500 ${
                  testimonial.position !== 0
                    ? "cursor-pointer hover:opacity-90"
                    : ""
                }`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  active={testimonial.position === 0}
                />
              </motion.div>
            ))}
          </div>

          {/* Tablet 2-Card View */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:hidden">
            {visibleTestimonials.slice(0, 2).map((testimonial) => (
              <motion.div
                key={`tablet-slot-${testimonial.position}`}
                animate={{
                  scale: testimonial.position === 0 ? 1.02 : 0.97,
                  opacity: testimonial.position === 0 ? 1 : 0.85,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                onClick={() => {
                  if (testimonial.position !== 0) nextSlide();
                }}
                className={testimonial.position !== 0 ? "cursor-pointer" : ""}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  active={testimonial.position === 0}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Swipe View with AnimatePresence */}
          <div className="overflow-hidden sm:hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 40 || velocity.x > 250) {
                    previousSlide();
                  } else if (offset.x < -40 || velocity.x < -250) {
                    nextSlide();
                  }
                }}
                initial={{
                  opacity: 0,
                  x: direction * 50,
                  scale: 0.95,
                  rotate: direction * 2,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction * -50,
                  scale: 0.95,
                  rotate: direction * -2,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <TestimonialCard
                  testimonial={{
                    ...testimonials[activeIndex],
                    position: 0,
                  }}
                  active
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-3 sm:mt-11 sm:gap-5">
          <CarouselButton
            direction="left"
            onClick={previousSlide}
            className="md:hidden"
          />

          <Pagination
            activeIndex={activeIndex}
            total={total}
            onSelect={goToSlide}
          />

          <CarouselButton
            direction="right"
            onClick={nextSlide}
            className="md:hidden"
          />
        </div>
      </div>
    </section>
  );
}

function Header({
  data,
  onPrevious,
  onNext,
}: {
  data: TestimonialsData;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative text-center"
    >
      <div className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
          {data.badge}
        </span>
      </div>

      <h2 className="mx-auto mt-4 max-w-[1100px] text-[56px] font-bold leading-[1.04] tracking-[-0.045em] text-[#101522] sm:mt-6">
        {data.heading.line1}{" "}
        <span className="text-[#d8003f]">{data.heading.highlight}</span>
      </h2>

      <p className="mx-auto mt-3.5 max-w-[750px] text-[15px] leading-relaxed text-[#17191f]/85 sm:mt-5 sm:text-[17px] md:text-[19px]">
        {data.description}
      </p>

      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
        <CarouselButton direction="left" onClick={onPrevious} />
        <CarouselButton direction="right" onClick={onNext} />
      </div>
    </motion.div>
  );
}

function CarouselButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "left" ? "Previous testimonial" : "Next testimonial"
      }
      className={`group flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-[#17191f]/30 bg-white/95 text-[#17191f] shadow-xs transition-all duration-300 hover:border-[#d8003f] hover:bg-[#d8003f] hover:text-white cursor-pointer active:scale-95 ${className}`}
    >
      {direction === "left" ? (
        <ChevronLeft
          size={20}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      ) : (
        <ChevronRight
          size={20}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

function TestimonialCard({
  testimonial,
  active,
}: {
  testimonial: TestimonialItem & {
    position?: number;
  };
  active: boolean;
}) {
  return (
    <article
      className={`relative flex min-h-[390px] sm:min-h-[430px] flex-col overflow-hidden rounded-[20px] p-6 sm:p-8 md:p-9 transition-all duration-500 ${
        active
          ? "border border-black bg-[#111318] text-white shadow-[0_12px_35px_rgba(16,21,34,0.16)]"
          : "border border-[#eadbdd] bg-white text-[#11151c] shadow-[0_10px_30px_rgba(16,21,34,0.06)]"
      }`}
    >
      <motion.div
        key={`quote-icon-${testimonial.id}`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`text-[48px] sm:text-[56px] font-bold leading-[0.7] select-none ${
          active ? "text-[#e00045]" : "text-[#d8003f]"
        }`}
      >
        “
      </motion.div>

      <div className="mt-2 flex items-center gap-1.5 text-[#d8003f]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={`star-${index}`}
            className="text-[20px] sm:text-[23px] leading-none"
          >
            ★
          </span>
        ))}
      </div>

      <motion.p
        key={`quote-text-${testimonial.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-6 sm:mt-7 max-w-[390px] text-[15px] sm:text-[17px] font-medium leading-[1.55] sm:leading-[1.5] ${
          active ? "text-white/95" : "text-[#17191f]"
        }`}
      >
        {testimonial.quote}
      </motion.p>

      <div className="mt-auto flex flex-col items-center pt-7 sm:pt-8 text-center">
        <div
          className={`relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full ring-4 transition-all duration-300 ${
            active
              ? "ring-white/20 bg-white/10"
              : "ring-black/[0.06] bg-[#e7e4e1]"
          }`}
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, 96px"
          />
        </div>

        <motion.div
          key={`meta-${testimonial.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`mt-3.5 sm:mt-4 text-base sm:text-lg font-bold ${
              active ? "text-white" : "text-[#11151c]"
            }`}
          >
            {testimonial.name}
          </h3>

          <p
            className={`mt-0.5 text-xs sm:text-sm ${
              active ? "text-white/75" : "text-[#17191f]/80"
            }`}
          >
            {testimonial.role}
          </p>
        </motion.div>
      </div>
    </article>
  );
}

function Pagination({
  activeIndex,
  total,
  onSelect,
}: {
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className="relative h-2 rounded-full cursor-pointer p-0 overflow-hidden"
          >
            <motion.div
              layout
              animate={{
                width: isActive ? 48 : 12,
                backgroundColor: isActive ? "#d8003f" : "#dedbd8",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className="h-full rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
}

function BackgroundDecorations() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 12, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full border-[32px] border-[#f4d9dc]/40 sm:h-96 sm:w-96"
      />

      <motion.div
        animate={{
          x: [0, -10, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[28px] border-[#f4d9dc]/30 sm:h-80 sm:w-80"
      />

      <div className="pointer-events-none absolute left-0 top-0 opacity-40">
        <DotPattern />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 opacity-40">
        <DotPattern />
      </div>

      <motion.div
        animate={{
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[7%] top-[25%] hidden h-28 w-28 rounded-full border border-[#edcbd0]/40 lg:block"
      />
    </>
  );
}

function DotPattern() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 100 }).map((_, index) => {
        const row = Math.floor(index / 10);
        const column = index % 10;

        return (
          <circle
            key={index}
            cx={column * 18 + 3}
            cy={row * 18 + 3}
            r="1.5"
            fill="#d8003f"
            opacity={0.18 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}