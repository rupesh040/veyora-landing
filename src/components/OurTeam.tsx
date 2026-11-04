"use client";

import Image from "next/image";
import { motion } from "motion/react";
import contentData from "@/src/data";
import type { ContentData, OurTeamMember } from "@/src/types/content";

export default function OurTeam() {
  const teamData = (contentData as ContentData).ourTeam!;

  if (!teamData) return null;

  return (
    <section id="team" className="relative scroll-mt-20 overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 xl:px-16">
      <div className="mx-auto max-w-[1450px]">
        <Header
          badge={teamData.badge}
          heading={teamData.heading}
          description={teamData.description}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 sm:gap-6 lg:gap-6 xl:gap-7">
          {teamData.members.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Header({
  badge,
  heading,
  description,
}: {
  badge: string;
  heading: { line1: string; highlight: string };
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-[950px] text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center rounded-full border-2 border-[#2563eb] px-6 py-2 sm:px-7"
      >
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#2563eb] sm:text-sm">
          {badge}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-5 text-[56px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#11151c] sm:mt-6"
      >
        {heading.line1}{" "}
        <span className="text-[#2563eb]">{heading.highlight}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-3.5 max-w-[800px] text-[15px] leading-relaxed text-[#374151] sm:mt-4 sm:text-[17px] md:text-[19px]"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: OurTeamMember;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: 0.08 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[1/1.03] w-full overflow-hidden bg-[#f3f4f6]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
        />
      </div>
      <div className="h-[2.5px] w-full bg-[#2563eb]" aria-hidden="true" />
      <div className="flex flex-1 flex-col justify-between p-4.5 sm:p-5">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-[#111827] sm:text-[19px]">
            {member.name}
          </h3>

          <p className="mt-0.5 text-sm font-semibold text-[#2563eb] sm:text-[15px]">
            {member.role}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          {member.socials?.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${social.platform}`}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#111827] text-[#111827] transition-all duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white sm:h-6.5 sm:w-6.5"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={social.iconSvg} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}