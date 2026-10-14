"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Headphones,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

import content from '../data';
const defaultData = content.serviceDetail;
const { services } = defaultData;

const iconMap: Record<string, any> = { Users, Target, Clock3, Star, ShieldCheck, Headphones };

export default function ServiceDetail({ id }: { id?: string }) {
  const params = useParams();
  const currentServiceId = (id || (params?.id as string) || "brand-strategy").toLowerCase();

  const serviceItem = (defaultData.servicesData as Record<string, any>)?.[currentServiceId] || defaultData;
  const currentData = {
    ...defaultData,
    ...serviceItem,
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 xl:px-14 2xl:px-10">
      <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[minmax(0,1fr)_315px] xl:grid-cols-[minmax(0,1fr)_335px] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_350px]">
        <main className="min-w-0">
          <ServiceIntroduction data={currentData} />

          <Benefits data={currentData} />

          <Approach data={currentData} />
        </main>

        <ServiceSidebar currentServiceId={currentServiceId} />
      </div>
    </section>
  );
}

function ServiceIntroduction({ data }: { data: any }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] xl:gap-10">
      <motion.div
        key={`intro-text-${data.badge}`}
        initial={{
          opacity: 0,
          x: -35,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#d8003f] ">
            {data.badge}
          </span>
        </div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 text-[56px] font-bold leading-[1.05] tracking-[-0.045em] text-[#10234a]"
        >
          {data.headingStart}
          <span className="block text-[#d8003f]">
            {data.headingHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.28,
          }}
          className="mt-6 max-w-[690px] text-[13px] leading-[1.7] text-[#687388] sm:text-[15px] lg:text-[14px]"
        >
          {data.description}
        </motion.p>
      </motion.div>

      <motion.div
        key={`intro-img-${data.badge}`}
        initial={{
          opacity: 0,
          x: 35,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative aspect-[2/1.5] mt-2 overflow-hidden rounded-[6px]"
      >
        <Image
          src={data.introImage}
          alt={data.badge}
          fill
          priority
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          sizes="(max-width: 1023px) 100vw, 40vw"
        />
      </motion.div>
    </div>
  );
}

function Benefits({ data }: { data: any }) {
  const benefits = data.benefits || [];
  return (
    <section className="mt-12 sm:mt-14 lg:mt-16">
      <motion.h2
        key={`benefits-h2-${data.badge}`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
        className="text-2xl font-bold tracking-[-0.035em] text-[#10234a]"
      >
        {data.benefitsHeading}
      </motion.h2>

      <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-8 xl:gap-x-16">
        {benefits.map((benefit: any, index: number) => (
          <BenefitCard
            key={benefit.title}
            benefit={benefit}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: any;
  index: number;
}) {
  const Icon = (benefit.icon && iconMap[benefit.icon as string]) || Star;

  return (
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
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
      }}
      className="group flex gap-4 sm:gap-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0f2] text-[#d8003f] transition-all duration-300 group-hover:bg-[#d8003f] group-hover:text-white sm:h-16 sm:w-16">
        <Icon
          size={24}
          strokeWidth={1.8}
        />
      </div>

      <div className="pt-1">
        <h3 className="text-base font-bold leading-[1.3] text-[#10234a] sm:text-lg">
          {benefit.title}
        </h3>

        <p className="mt-1.5 max-w-[330px] text-sm leading-[1.55] text-[#737d8f]">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}

function Approach({ data }: { data: any }) {
  const approach = data.approach || [];
  return (
    <section className="mt-12 sm:mt-14 lg:mt-16">
      <div className="grid gap-4 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] xl:gap-8">
        <motion.div
          key={`approach-img-${data.badge}`}
          initial={{
            opacity: 0,
            x: -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.75,
          }}
          className="relative aspect-[1.05/1.1] overflow-hidden rounded-[6px]"
        >
          <Image
            src={data.approachImage}
            alt={data.approachHeading}
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
        </motion.div>

        <motion.div
          key={`approach-info-${data.badge}`}
          initial={{
            opacity: 0,
            x: 35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.75,
          }}
        >
          <h2 className="text-[clamp(1.64rem,3vw,2.34rem)] font-bold tracking-[-0.035em] text-[#10234a]">
            {data.approachHeading}
          </h2>

          <p className="mt-2 max-w-[650px] text-[13px] leading-[1.65] text-[#687388] sm:text-[15px]">
            {data.approachDescription}
          </p>

          <div className="relative mt-6 space-y-5">
            <div className="absolute bottom-5 left-[21px] top-5 w-px bg-[#f4cbd2]" />

            {approach.map((item: any, index: number) => (
              <ApproachItem
                key={item.number}
                item={item}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ApproachItem({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <motion.div
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      className="relative flex gap-4"
    >
      <div className="relative z-10 flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full bg-[#fff0f2] text-sm font-bold text-[#d8003f]">
        {item.number}
      </div>

      <div className="pt-0.5">
        <h3 className="text-sm font-bold text-[#10234a] sm:text-base">
          {item.title}
        </h3>

        <p className="mt-1 text-xs leading-[1.55] text-[#737d8f] sm:text-xs">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceSidebar({ currentServiceId }: { currentServiceId: string }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start xl:space-y-6">
      <ServicesCard currentServiceId={currentServiceId} />

      <HelpCard />
    </aside>
  );
}

function ServicesCard({ currentServiceId }: { currentServiceId?: string }) {
  const params = useParams();
  const activeId = (currentServiceId || (params?.id as string) || "").toLowerCase();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 35,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="overflow-hidden rounded-[7px] border border-[#e2e5e9] bg-white shadow-[0_5px_20px_rgba(16,35,74,0.04)]"
    >
      <div className="bg-[#d8003f] px-5 py-4 sm:px-6">
        <h2 className="text-lg font-bold text-white sm:text-xl">
          {defaultData.servicesTitle || "Our Services"}
        </h2>
      </div>

      <div>
        {services.map((service: any) => {
          const isActive = Boolean(
            activeId && (service.link.endsWith(`/${activeId}`) || service.link === `/services/${activeId}`)
          );
          return (
            <Link
              href="/services"
              key={service.title}
              className={`group flex min-h-[48px] items-center justify-between gap-3 border-b border-[#edf0f3] px-5 text-sm font-semibold transition-all duration-300 last:border-b-0 sm:px-6 ${
                isActive
                  ? "bg-[#fff0f2] text-[#d8003f]  font-bold"
                  : "text-[#243451] hover:bg-[#fff0f2] hover:text-[#d8003f]"
              }`}
            >
              <span>{service.title}</span>

              <ArrowRight
                size={18}
                className={`shrink-0 transition-transform duration-300 ${
                  isActive ? "translate-x-1 text-[#d8003f]" : "group-hover:translate-x-1"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

function HelpCard() {
  return (
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
        duration: 0.7,
      }}
      className="rounded-[7px] bg-[#fff0f2] p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="max-w-[210px] text-xl font-bold leading-[1.2] tracking-[-0.025em] text-[#10234a] sm:text-2xl">
            {defaultData.helpCardTitle}
          </h2>

          <p className="mt-3 max-w-[260px] text-sm leading-[1.55] text-[#737d8f]">
            {defaultData.helpCardDescription}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ffe0e6] text-[#d8003f]">
          <Headphones size={25} />
        </div>
      </div>

      <Link
        href={defaultData.helpCardButtonLink}
        className="group mt-5 inline-flex items-center gap-3 rounded-md bg-[#d8003f] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b90036]"
      >
        {defaultData.helpCardButtonText}

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}
