"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import content from '../data';
const data = content.gallery;
const { galleryItems } = content.gallery;

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  const itemsPerPage = mounted && isMobile ? 4 : 8;

  const totalPages = Math.ceil(
    galleryItems.length / itemsPerPage,
  );

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return galleryItems.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (mounted) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, mounted]);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
      scrollToGallery();
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
      scrollToGallery();
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToGallery();
  };

  const scrollToGallery = () => {
    window.requestAnimationFrame(() => {
      const element =
        document.getElementById("gallery-grid");

      if (!element) {
        return;
      }

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        120;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  };

  return (
    <section id="gallery" className="relative scroll-mt-20 overflow-hidden bg-[#fcfaf8] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        <GalleryHeader data={data} />

        <div
          id="gallery-grid"
          className="mt-10 grid grid-cols-1 gap-x-5 gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:mt-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-8"
        >
          <AnimatePresence mode="wait">
            {visibleItems.map((item: any, index: number) => (
              <GalleryCard
                key={`${currentPage}-${item.title}`}
                item={item}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div
            suppressHydrationWarning
            className="mt-12 flex items-center justify-center gap-3 sm:mt-14 lg:mt-16"
          >
            <button
              type="button"
              onClick={previousPage}
              disabled={currentPage === 1}
              suppressHydrationWarning
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191f]/15 bg-white text-[#17191f] transition-all duration-300 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#17191f]/15 disabled:hover:bg-white disabled:hover:text-[#17191f]"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const page = index + 1;
                  const isActive = currentPage === page;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={isActive ? "page" : undefined}
                      suppressHydrationWarning
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-[#2563eb] text-white shadow-[0_6px_20px_rgba(37,99,235,0.28)]"
                          : "border border-[#17191f]/15 bg-white text-[#17191f] hover:border-[#2563eb] hover:text-[#2563eb]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                },
              )}
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              suppressHydrationWarning
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191f]/15 bg-white text-[#17191f] transition-all duration-300 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#17191f]/15 disabled:hover:bg-white disabled:hover:text-[#17191f]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryHeader({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex rounded-full border-2 border-[#2563eb] px-6 py-2"
        >
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#2563eb] sm:text-sm">
            {data.badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-3 max-w-[1000px] text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#101522]"
        >
          {data.headingStart}{" "}
          <span className="text-[#2563eb]">
            {data.headingHighlight}
          </span>
        </motion.h2>
      </div>

      <motion.p
        initial={{
          opacity: 0,
          x: 25,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-[460px] text-[15px] leading-[1.6] text-[#17191f] sm:text-[17px] md:text-[19px]"
      >
        {data.description}
      </motion.p>
    </div>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[number];
  index: number;
}) {
  return (
    <motion.div
      suppressHydrationWarning
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="block w-full text-left">
        <div className="relative aspect-[1.72/1] overflow-hidden rounded-[10px] bg-[#f0eeee]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/[0.10]" />
        </div>
      </div>

      <div className="px-1 pt-2.5">
        <h3 className="text-base font-medium tracking-[-0.02em] text-[#17191f] sm:text-lg">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}
