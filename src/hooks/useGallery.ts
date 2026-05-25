"use client";

import { useState, useCallback } from "react";

export function useGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const open = useCallback((imageList: string[], vehicleTitle: string) => {
    setImages(imageList);
    setTitle(vehicleTitle);
    setCurrentIndex(0);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return {
    isOpen,
    currentIndex,
    images,
    title,
    open,
    close,
    next,
    prev,
    setIndex: setCurrentIndex,
  };
}
