"use client";

import { useEffect, useCallback } from "react";
import { useGallery } from "@/hooks/useGallery";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryModalProps {
  gallery: ReturnType<typeof useGallery>;
}

export function GalleryModal({ gallery }: GalleryModalProps) {
  const { isOpen, close, next, prev, currentIndex, images, title } = gallery;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    },
    [isOpen, next, prev, close]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 shrink-0">
        <div>
          <p className="text-gold font-black uppercase text-xs tracking-[0.12em]">
            Vehicle photos
          </p>
          <h2 className="text-white text-lg md:text-xl font-bold leading-tight mt-0.5">
            {title}
          </h2>
        </div>
        <button
          onClick={close}
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-semibold px-3 py-2 rounded-md hover:bg-white/10"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-2 sm:px-8 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={images[currentIndex] || "/assets/vehicle-suv.png"}
              alt={`${title} photo ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 flex flex-col items-center gap-3 pb-4 pt-2">
        {/* Counter */}
        <p className="text-white/60 text-sm font-medium tabular-nums">
          {currentIndex + 1} / {images.length}
        </p>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 px-4 overflow-x-auto max-w-full pb-1 scrollbar-hide">
            {images.map((src, index) => (
              <button
                key={index}
                type="button"
                onClick={() => gallery.setIndex(index)}
                className={`shrink-0 relative w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-black/60"
                    : "opacity-50 hover:opacity-80"
                }`}
                aria-label={`Show photo ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
