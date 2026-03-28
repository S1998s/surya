"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import PersonalNavMotion from "@/components/personal/PersonalNavMotion";
import { ScrollProgressBar } from "@/components/personal/personal-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const imagePath = (src: string) => `${basePath}${src}`;

const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9lijQwAAAABJRU5ErkJggg==";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  const [transformationPhase, setTransformationPhase] = useState<"all" | "before" | "after">("all");

  const galleries = useMemo(
    () => [
      {
        id: 1,
        title: "Childhood",
        category: "Childhood",
        image: imagePath("/images/personal/IMG_0657.JPG.jpeg"),
        description: "Beautiful sunrise captures from various locations",
      },
      {
        id: 16,
        title: "Childhood",
        category: "Childhood",
        image: imagePath("/images/personal/IMG_2645.JPG.jpeg"),
        description: "Beautiful sunrise captures from various locations",
      },
      {
        id: 2,
        title: "Groom photos",
        category: "groom",
        image: imagePath("/images/personal/IMG_20260102_124714.jpg.jpeg"),
        description: "Mountain hiking and nature exploration",
      },
      {
        id: 17,
        title: "Groom photos",
        category: "groom",
        image: imagePath("/images/personal/IMG_5426.PNG"),
        description: "Mountain hiking and nature exploration",
      },
      {
        id: 3,
        title: "Transformation",
        category: "groom",
        image: imagePath("/images/personal/IMG_6918.JPG.jpeg"),
        description: "City life and urban landscapes",
      },
      {
        id: 4,
        title: "Cricket Passion",
        category: "sports",
        image: imagePath("/images/personal/35864.jpg.jpeg"),
        description: "Cricket matches and playing moments",
      },
      {
        id: 5,
        title: "Candid",
        category: "candid",
        image: imagePath("/images/personal/IMG_3929.JPG.jpeg"),
        description: "Fitness journey and sports activities",
      },
      {
        id: 10,
        title: "Candid",
        category: "candid",
        image: imagePath("/images/personal/IMG_6428.jpg"),
        description: "Fitness journey and sports activities",
      },
      {
        id: 6,
        title: "Family Moments",
        category: "family",
        image: imagePath("/images/personal/IMG_20260321_214954.jpg.jpeg"),
        description: "Precious family memories and celebrations",
      },
      { id: 7, title: "Family Moment 2", category: "sports", image: imagePath("/images/personal/35873.jpg.jpeg"), date: "2025", description: "Family celebration" },
      { id: 8, title: "Vicktory", category: "sports", image: imagePath("/images/personal/44252.jpg.jpeg"), date: "2025", description: "Family memories" },
      { id: 9, title: "Before won", category: "transformation", phase: "before", image: imagePath("/images/personal/1678018714280.jpg.jpeg"), date: "2023", description: "Nature moment" },
      { id: 12, title: "Special Photo", category: "groom", image: imagePath("/images/personal/IMG_0935%20Copy%20Copy.jpg.jpeg"), date: "2025", description: "Special moment captured" },
      { id: 13, title: "After Transformation", category: "transformation", phase: "after", image: imagePath("/images/personal/IMG_5017.jpg"), date: "2024", description: "Urban scene" },
      { id: 14, title: "Transformation Complete", category: "transformation", phase: "after", image: imagePath("/images/personal/IMG_5027.jpg"), date: "2024", description: "New beginning" },
      { id: 15, title: "Transformation Complete", category: "transformation", phase: "after", image: imagePath("/images/personal/IMG_5026.jpg"), date: "2024", description: "New beginning" },
    ],
    []
  );

  const categoryPreviews = useMemo(() => {
    const map = new Map<string, (typeof galleries)[number]>();
    galleries.forEach((g) => {
      const key = g.category.toLowerCase();
      if (!map.has(key)) map.set(key, g);
    });
    return Array.from(map.values());
  }, [galleries]);

  const filteredGalleries = useMemo(
    () =>
      selectedCategory === "all"
        ? galleries
        : selectedCategory === "transformation"
        ? galleries.filter((g) =>
            g.category.toLowerCase() === selectedCategory.toLowerCase() &&
            (transformationPhase === "all" || g.phase === transformationPhase)
          )
        : galleries.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase()),
    [galleries, selectedCategory, transformationPhase]
  );

  const categories = useMemo(
    () => ["all", ...categoryPreviews.map((g) => g.category.toLowerCase())],
    [categoryPreviews]
  ) as string[];

  const activeGallery = useMemo(
    () => (lightboxId !== null ? galleries.find((g) => g.id === lightboxId) ?? null : null),
    [galleries, lightboxId]
  );

  const activeGalleryCount = useMemo(
    () =>
      activeGallery
        ? galleries.filter((g) => g.category.toLowerCase() === activeGallery.category.toLowerCase()).length
        : 0,
    [galleries, activeGallery]
  );

  const displayedGalleries = useMemo(
    () => (selectedCategory === "all" ? categoryPreviews : filteredGalleries),
    [selectedCategory, categoryPreviews, filteredGalleries]
  );

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  useEffect(() => {
    if (lightboxId === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxId]);

  useEffect(() => {
    if (lightboxId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxId, closeLightbox]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900">
      <ScrollProgressBar />
      <PersonalNavMotion
        brandLabel="🎨 My Gallery 🎨"
        brandHref="/personal"
        active="gallery"
        backHref="/personal"
        backLabel="← Personal home"
      />

      <main>
        {activeGallery && (
          <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/90 p-0 sm:items-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            onClick={closeLightbox}
          >
            <div
              className="max-h-[100dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border-4 border-lime-400 bg-gradient-to-br from-pink-600/50 to-purple-600/50 p-5 shadow-2xl sm:rounded-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeGallery.image}
                alt={activeGallery.title}
                width={1600}
                height={900}
                unoptimized
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="mb-5 max-h-[min(55vh,520px)] w-full cursor-default rounded-xl border-2 border-lime-400 object-contain sm:max-h-[520px]"
              />
              <button
                type="button"
                onClick={closeLightbox}
                className="w-full min-h-12 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 text-base font-black text-black"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <section className="px-4 pb-8 pt-12 text-center sm:px-6 sm:pb-10 sm:pt-16 lg:px-8">
            <div>
              <h1 className="text-4xl font-black drop-shadow-lg sm:text-6xl md:text-7xl">
                <span className="text-lime-300">Photo Collections</span>
              </h1>
              <p className="mt-4 text-lg font-bold text-white drop-shadow-md sm:text-2xl">
                My life in pictures — because words can&apos;t always say it 📸✨
              </p>
            </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="-mx-1 flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat !== "transformation") {
                      setTransformationPhase("all");
                    }
                  }}
                  className={`rounded-full px-4 py-2.5 text-sm font-black transition-colors sm:px-6 sm:py-3 sm:text-lg ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-lime-400 to-cyan-400 text-black shadow-lg shadow-lime-500/40"
                      : "border-2 border-lime-400 bg-gradient-to-r from-pink-600/50 to-purple-600/50 text-white hover:border-pink-400"
                  }`}
                >
                  {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            {selectedCategory === "transformation" && (
              <div className="mt-6 flex justify-center gap-3">
                {["all", "before", "after"].map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setTransformationPhase(phase as "all" | "before" | "after")}
                    className={`rounded-full px-4 py-2 text-sm font-black transition-colors sm:px-5 sm:py-2.5 sm:text-base ${
                      transformationPhase === phase
                        ? "bg-gradient-to-r from-orange-400 to-red-400 text-black shadow-lg shadow-orange-500/40"
                        : "border-2 border-orange-400 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white hover:border-orange-400"
                    }`}
                  >
                    {phase.charAt(0).toUpperCase() + phase.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {displayedGalleries.map((gallery) => {
                const isCategoryMode = selectedCategory !== "all";
                return (
                    <button
                      key={gallery.id}
                      type="button"
                      onClick={() => {
                        if (!isCategoryMode) {
                          setSelectedCategory(gallery.category.toLowerCase());
                        } else {
                          setLightboxId(gallery.id);
                        }
                      }}
                      className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl border-4 text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all ${
                        isCategoryMode
                          ? "border-lime-400 bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-900"
                          : "aspect-square border-lime-400 bg-gradient-to-br from-purple-600 to-purple-900"
                      }`}
                    >
                            <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl sm:rounded-2xl">
                        <Image
                          src={gallery.image}
                          alt={gallery.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      {isCategoryMode ? (
                        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p className="text-xs font-black uppercase tracking-wider text-white/90">Click to open</p>
                        </div>
                      ) : (
                        <>
                          <div className="relative z-10 p-4 sm:p-5">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-300 drop-shadow-md sm:text-sm">
                              {gallery.category}
                            </p>
                            <h2 className="text-lg font-extrabold text-lime-300 drop-shadow-md sm:text-xl">
                              {gallery.title}
                            </h2>
                            <p className="mt-2 text-sm font-semibold text-white drop-shadow-md sm:text-base">
                              {gallery.description}
                            </p>
                            {gallery.date && (
                              <span className="mt-3 inline-block rounded-lg bg-black/30 px-3 py-1 text-xs font-black text-white">
                                {gallery.date}
                              </span>
                            )}
                          </div>
                           <div className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs font-black uppercase tracking-wide text-white/90 shadow-sm">
                            {gallery.category}
                          </div>
                          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="text-xs font-black text-white opacity-90">Tap to view category</p>
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </section>
        <section className="border-t border-white/10 bg-gradient-to-r from-purple-800/50 to-pink-800/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-black text-lime-300 drop-shadow-lg sm:text-4xl">Want More? 🤔</h2>
              <p className="mb-8 mt-4 text-base font-bold text-white drop-shadow-md sm:text-lg">
                Check out individual photos with full details and descriptions!
              </p>
              <div>
                <Link
                  href="/personal/photos"
                  className="inline-block rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 px-8 py-4 text-base font-black text-black shadow-xl sm:text-lg"
                >
                  See All My Photos 📷
                </Link>
              </div>
            </div>
        </section>

        <footer className="border-t-4 border-lime-400 bg-gradient-to-r from-purple-900 to-pink-900 py-10 shadow-lg shadow-lime-500/30 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 text-center font-black text-white drop-shadow-md sm:px-6 lg:px-8">
            <p>Made with 📸 and infinite patience by Shanmugavel</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
