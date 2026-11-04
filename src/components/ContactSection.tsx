"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Smartphone,
  CheckCircle,
  X,
} from "lucide-react";

import content from '../data';
const data = content.contactSection;
const { services } = data;

export default function ContactSection() {
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numbersOnly = event.target.value
      .replace(/\D/g, "")
      .slice(0, 15);

    setPhone(numbersOnly);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setService("");
    setPhone("");
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex min-h-[620px] overflow-hidden bg-[#08090b] px-6 py-14 text-white sm:px-10 sm:py-16 md:px-14 md:py-20 lg:min-h-screen lg:px-10 lg:py-14 xl:px-14 2xl:px-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#2563eb]/10 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/[0.025] blur-3xl" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.035),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.025),transparent_30%)]" />
          </div>

          <div className="relative z-10 flex w-full flex-col">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="inline-flex self-start rounded-full border-2 border-[#2563eb] px-4 py-2 "
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563eb] ">
                {data.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-[56px] font-bold leading-[0.98] tracking-[-0.055em]"
            >
              {data.headingStart}
              <span className="block text-[#2563eb]">
                {data.headingHighlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
              className="mt-10 max-w-[560px] text-[17px] leading-[1.45] text-white/90 sm:text-[19px] md:text-[21px]"
            >
              {data.description}
            </motion.p>

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
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="mt-10 max-w-[650px]"
            >
              {data.contactInfo.map((info: any, i: number) => {
                const IconComp = info.icon === 'Mail' ? Mail : info.icon === 'Smartphone' ? Smartphone : MapPin;
                return (
                  <ContactInfo
                    key={i}
                    icon={<IconComp size={28} strokeWidth={1.7} />}
                    text={info.text}
                  />
                );
              })}
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-10 sm:mt-12 lg:mt-auto pt-6"
            >
              <div className="relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-[280px] xl:h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <Image
                  src={data.image || "/cta/cta-collaboration.webp"}
                  alt={data.imageAlt || "Creative Team Collaboration"}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090b]/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex min-h-[700px] items-center bg-[#fffefe] px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20 lg:min-h-screen lg:px-10 lg:py-14 xl:px-14 2xl:px-16"
        >
          <div className="mx-auto w-full max-w-[760px]">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >
              <h2 className="text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#0d0f13]">
                {data.formHeadingStart}
                <span className="block">
                  {data.formHeadingHighlight}
                </span>
              </h2>

              <p className="mt-5 text-[15px] leading-[1.45] text-[#17191f]/80 sm:text-[17px] md:text-[19px]">
                {data.formDescription}
              </p>
            </motion.div>

            <motion.form
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              onSubmit={handleSubmit}
              className="mt-10 sm:mt-12"
            >
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                <Field
                  label={data.formFields?.name?.label || "Name"}
                  name="name"
                  type="text"
                  placeholder={data.formFields?.name?.placeholder || "Name"}
                  required
                />

                <Field
                  label={data.formFields?.email?.label || "Email"}
                  name="email"
                  type="email"
                  placeholder={data.formFields?.email?.placeholder || "Email"}
                  required
                />

                <div>
                  <label
                    htmlFor="company"
                    className="block text-base font-semibold text-[#111318] sm:text-lg"
                  >
                    {data.formFields?.company?.label || "Company"}
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={data.formFields?.company?.placeholder || "Company"}
                    className="mt-1 h-12 w-full border-b-2 border-[#17191f]/80 bg-transparent px-0 text-base text-[#111318] outline-none placeholder:text-[#17191f] transition-colors duration-300 focus:border-[#2563eb] sm:text-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-base font-semibold text-[#111318] sm:text-lg"
                  >
                    {data.formFields?.phone?.label || "Phone"}
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={data.formFields?.phone?.placeholder || "Phone"}
                    pattern="[0-9]*"
                    className="mt-1 h-12 w-full border-b-2 border-[#17191f]/80 bg-transparent px-0 text-base text-[#111318] outline-none placeholder:text-[#17191f] transition-colors duration-300 focus:border-[#2563eb] sm:text-lg"
                  />
                </div>

                <div className="relative sm:col-span-2">
                  <label
                    htmlFor="service"
                    className="block text-base font-semibold text-[#111318] sm:text-lg"
                  >
                    {data.formFields?.service?.label || "Service Needed"}
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setIsOpen((open) => !open)
                    }
                    className="mt-1 flex h-12 w-full items-center justify-between border-b-2 border-[#17191f]/80 bg-transparent text-left text-base text-[#17191f] transition-colors duration-300 hover:border-[#2563eb] sm:text-lg"
                  >
                    <span
                      className={
                        service
                          ? "text-[#111318]"
                          : "text-[#17191f]/80"
                      }
                    >
                      {service || data.formFields?.service?.placeholder || "Choose a service"}
                    </span>

                    <ChevronDown
                      size={23}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="absolute left-0 right-0 top-[82px] z-30 overflow-hidden rounded-xl border border-[#e5e1e1] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
                    >
                      {services.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setService(item);
                            setIsOpen(false);
                          }}
                          className="block w-full px-5 py-3 text-left text-sm text-[#111318] transition-colors duration-200 hover:bg-[#2563eb] hover:text-white sm:text-base"
                        >
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="details"
                    className="block text-base font-semibold text-[#111318] sm:text-lg"
                  >
                    {data.formFields?.details?.label || "Project Details"}
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder={data.formFields?.details?.placeholder || "What are you hoping to create or change?"}
                    className="mt-2 min-h-[145px] w-full resize-none border-2 border-[#17191f]/80 bg-transparent px-4 py-4 text-base text-[#111318] outline-none placeholder:text-[#17191f]/75 transition-colors duration-300 focus:border-[#2563eb] sm:text-lg"
                  />
                </div>
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:items-end">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-5 rounded-full bg-[#2563eb] px-8 py-4 text-base font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.18)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1d4ed8] sm:px-9 sm:py-4 sm:text-lg"
                >
                  <span>
                    {submitted
                      ? (data.formButtons?.submitted || "Sent")
                      : (data.formButtons?.submit || "Send")}
                  </span>

                  <ArrowRight
                    size={27}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-sm text-[#111318] sm:text-base">
                  {data.formFooterText || "We reply within 2 business days."}
                </p>

                {submitted && (
                  <div className="flex w-full items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    <CheckCircle size={18} className="shrink-0 text-green-600" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      transition={{
        duration: 0.3,
      }}
      className="flex items-center gap-5 border-b border-white/15 py-5 text-base sm:text-lg md:text-xl"
    >
      <span className="shrink-0 text-[#2563eb]">
        {icon}
      </span>

      <span className="text-white/90">
        {text}
      </span>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base font-semibold text-[#111318] sm:text-lg"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1 h-12 w-full border-b-2 border-[#17191f]/80 bg-transparent px-0 text-base text-[#111318] outline-none placeholder:text-[#17191f] transition-colors duration-300 focus:border-[#2563eb] sm:text-lg"
      />
    </div>
  );
}