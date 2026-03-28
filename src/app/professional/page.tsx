"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Professional() {
  const [showBackBtn, setShowBackBtn] = useState(false);

  useEffect(() => {
    // Check if resume was downloaded recently
    const downloaded = localStorage.getItem("resumeDownloaded") === "true";
    setShowBackBtn(downloaded);

    if (downloaded) {
      // clear after showing the button for a short time
      const timeout = window.setTimeout(() => {
        localStorage.removeItem("resumeDownloaded");
        setShowBackBtn(false);
      }, 8000);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <Navbar />

      {showBackBtn && (
        <div className="sticky top-16 z-40 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md py-3">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-300 font-bold hover:text-blue-200 transition-colors"
              onClick={() => {
                localStorage.removeItem("resumeDownloaded");
                setShowBackBtn(false);
              }}
            >
              ← Back to Home (resume downloaded)
            </Link>
          </div>
        </div>
      )}

      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
