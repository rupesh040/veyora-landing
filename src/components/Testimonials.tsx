"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import contentData from "@/src/data";
import type { TestimonialsData, TestimonialItem } from "@/src/types/content";

const testimonialsData = contentData.testimonials as TestimonialsData;
const baseTestimonials = testimonialsData.items;

const extendedTestimonials = [
  ...baseTestimonials,
  ...baseTestimonials,
  ...baseTestimonials,
];

export default function Testimonials() {
  const total = baseTestimonials.length;
  const [virtualIndex, setVirtualIndex] = useState(total);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(420);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setCardWidth(Math.min(340, window.innerWidth - 48));
      } else if (window.innerWidth < 1024) {
        setCardWidth(380);
      } else {
        setCardWidth(420);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const gap = cardWidth < 380 ? 20 : 32;
  const step = cardWidth + gap;
  const activeIndex = ((virtualIndex % total) + total) % total;

  const nextSlide = () => {
    setEnableTransition(true);
    setVirtualIndex((current) => current + 1);
  };

  const previousSlide = () => {
    setEnableTransition(true);
    setVirtualIndex((current) => current - 1);
  };

  const goToSlide = (targetIndex: number) => {
    setEnableTransition(true);
    const diff = targetIndex - activeIndex;
    setVirtualIndex((current) => current + diff);
  };

  useEffect(() => {
    if (virtualIndex >= total * 2) {
      const timer = setTimeout(() => {
        setEnableTransition(false);
        setVirtualIndex((current) => current - total);
      }, 520);
      return () => clearTimeout(timer);
    }

    if (virtualIndex < total) {
      const timer = setTimeout(() => {
        setEnableTransition(false);
        setVirtualIndex((current) => current + total);
      }, 520);
      return () => clearTimeout(timer);
    }
  }, [virtualIndex, total]);

  useEffect(() => {
    if (!enableTransition) {
      const frame = requestAnimationFrame(() => {
        setEnableTransition(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [enableTransition]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setEnableTransition(true);
      setVirtualIndex((current) => current + 1);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f7] px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16"
    >
      <BackgroundDecorations />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <Header
          data={testimonialsData}
          onPrevious={previousSlide}
          onNext={nextSlide}
        />

        <div
          style={{ perspective: 1200 }}
          className="relative mx-auto mt-8 w-full overflow-hidden py-6 sm:mt-12 sm:py-8 lg:mt-14"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -40 || velocity.x < -200) {
                nextSlide();
              } else if (offset.x > 40 || velocity.x > 200) {
                previousSlide();
              }
            }}
            animate={{
              x: `calc(50% - ${cardWidth / 2}px - ${virtualIndex * step}px)`,
            }}
            transition={
              enableTransition
                ? {
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    mass: 0.8,
                  }
                : { duration: 0 }
            }
            className="flex items-center cursor-grab active:cursor-grabbing"
            style={{ gap: `${gap}px` }}
          >
            {extendedTestimonials.map((testimonial, index) => {
              const isActive = index === virtualIndex;
              const distance = Math.abs(index - virtualIndex);
              const isVisible = distance <= 2;

              return (
                <motion.div
                  key={`extended-card-${index}`}
                  animate={{
                    scale: isActive ? 1.05 : 0.9,
                    opacity: isActive ? 1 : distance === 1 ? 0.55 : 0.12,
                    rotateY: isActive ? 0 : index < virtualIndex ? 6 : -6,
                    y: isActive ? -6 : 6,
                  }}
                  transition={
                    enableTransition
                      ? {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      : { duration: 0 }
                  }
                  onClick={() => {
                    if (!isActive) {
                      setEnableTransition(true);
                      setVirtualIndex(index);
                    }
                  }}
                  className={`shrink-0 select-none transition-shadow duration-500 ${
                    isActive
                      ? "z-20 cursor-default"
                      : isVisible
                        ? "z-10 cursor-pointer hover:opacity-85"
                        : "pointer-events-none"
                  }`}
                  style={{ width: cardWidth }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    active={isActive}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

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
      <div className="inline-flex rounded-full border-2 border-[#2563eb] px-6 py-2 sm:px-7">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#2563eb] sm:text-sm">
          {data.badge}
        </span>
      </div>

      <h2 className="mx-auto mt-4 max-w-[1100px] text-[56px] font-bold leading-[1.04] tracking-[-0.045em] text-[#101522] sm:mt-6">
        {data.heading.line1}{" "}
        <span className="text-[#2563eb]">{data.heading.highlight}</span>
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
      className={`group flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-[#17191f]/30 bg-white/95 text-[#17191f] shadow-xs transition-all duration-300 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white cursor-pointer active:scale-95 ${className}`}
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
  testimonial: TestimonialItem;
  active: boolean;
}) {
  return (
    <article
      className={`relative flex min-h-[390px] sm:min-h-[430px] flex-col overflow-hidden rounded-[20px] p-6 sm:p-8 md:p-9 transition-colors duration-500 ${
        active
          ? "border border-[#2563eb]/40 bg-[#111318] text-white shadow-[0_20px_50px_rgba(37,99,235,0.14)]"
          : "border border-[#e2e8f0] bg-white text-[#11151c] shadow-[0_10px_30px_rgba(16,21,34,0.06)]"
      }`}
    >
      <div
        className={`text-[48px] sm:text-[56px] font-bold leading-[0.7] select-none transition-colors duration-300 ${
          active ? "text-[#3b82f6]" : "text-[#2563eb]"
        }`}
      >
        “
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[#2563eb]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={`star-${index}`}
            className="text-[20px] sm:text-[23px] leading-none"
          >
            ★
          </span>
        ))}
      </div>

      <p
        className={`mt-6 sm:mt-7 max-w-[390px] text-[15px] sm:text-[17px] font-medium leading-[1.55] sm:leading-[1.5] transition-colors duration-300 ${
          active ? "text-white/95" : "text-[#17191f]"
        }`}
      >
        {testimonial.quote}
      </p>

      <div className="mt-auto flex flex-col items-center pt-7 sm:pt-8 text-center">
        <div
          className={`relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full ring-4 transition-all duration-300 ${
            active
              ? "ring-[#2563eb]/40 bg-white/10"
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

        <div>
          <h3
            className={`mt-3.5 sm:mt-4 text-base sm:text-lg font-bold transition-colors duration-300 ${
              active ? "text-white" : "text-[#11151c]"
            }`}
          >
            {testimonial.name}
          </h3>

          <p
            className={`mt-0.5 text-xs sm:text-sm transition-colors duration-300 ${
              active ? "text-white/75" : "text-[#17191f]/80"
            }`}
          >
            {testimonial.role}
          </p>
        </div>
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
                backgroundColor: isActive ? "#2563eb" : "#cbd5e1",
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
        className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full border-[32px] border-[#dbeafe]/50 sm:h-96 sm:w-96"
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
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[28px] border-[#dbeafe]/40 sm:h-80 sm:w-80"
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
        className="pointer-events-none absolute right-[7%] top-[25%] hidden h-28 w-28 rounded-full border border-[#dbeafe]/60 lg:block"
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
            fill="#2563eb"
            opacity={0.18 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}
