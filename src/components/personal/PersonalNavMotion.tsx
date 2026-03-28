"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "/personal", label: "About", key: "about" as const },
  { href: "/personal/gallery", label: "Gallery", key: "gallery" as const },
  { href: "/personal/photos", label: "Photos", key: "photos" as const },
];

export type PersonalNavActive = "about" | "gallery" | "photos";

type Props = {
  brandLabel: string;
  brandHref: string;
  active: PersonalNavActive;
  backHref: string;
  backLabel: string;
};

export default function PersonalNavMotion({
  brandLabel,
  brandHref,
  active,
  backHref,
  backLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b-4 border-lime-400 bg-gradient-to-r from-pink-600/90 to-cyan-600/90 shadow-lg shadow-pink-500/40 backdrop-blur-lg"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link
            href={brandHref}
            className="block max-w-[11rem] truncate text-lg font-black text-lime-300 drop-shadow-lg sm:max-w-none sm:text-2xl"
            onClick={() => setOpen(false)}
          >
            {brandLabel}
          </Link>
        </motion.div>

        <div className="hidden items-center gap-5 md:flex">
          {links.map(({ href, label, key }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-bold transition-colors ${
                active === key ? "text-lime-300" : "text-white hover:text-lime-300"
              }`}
            >
              {active === key && (
                <motion.span
                  layoutId="personal-nav-pill"
                  className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={backHref}
            className="hidden font-bold text-white transition-colors hover:text-lime-300 sm:inline"
            onClick={() => setOpen(false)}
          >
            {backLabel}
          </Link>

          <motion.button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/30 text-white md:hidden"
            aria-expanded={open}
            aria-controls="personal-nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            whileTap={reduce ? undefined : { scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="personal-nav-drawer"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/20 bg-gradient-to-b from-pink-700/95 to-cyan-800/95 md:hidden"
          >
            <div className="flex flex-col px-4 py-4">
              {links.map(({ href, label, key }, i) => (
                <motion.div
                  key={href}
                  initial={reduce ? false : { x: -28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    className={`block min-h-12 rounded-xl px-4 py-3 text-base font-bold ${
                      active === key ? "bg-white/20 text-lime-300" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { x: -28, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.24, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={backHref}
                  className="mt-2 block min-h-12 rounded-xl border-2 border-white/25 px-4 py-3 text-base font-bold text-white/90"
                  onClick={() => setOpen(false)}
                >
                  {backLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
