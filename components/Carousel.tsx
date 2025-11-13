"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCarouselStore } from "@/store/useCarouselStore";
import { ContentItem } from "@/types";

const ITEM_WIDTH = 280;
const GAP = 24;

interface CarouselProps {
  items: ContentItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  const { focusedIndex, setTotalItems, moveRight, moveLeft } =
    useCarouselStore();

  useEffect(() => {
    setTotalItems(items.length);
  }, [items.length, setTotalItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveRight();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveLeft();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveRight, moveLeft]);

  const translateX = -(focusedIndex * (ITEM_WIDTH + GAP));

  return (
    <div className="w-full overflow-hidden px-16 py-12">
      <div
        className="flex transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateX(${translateX}px)`,
          gap: `${GAP}px`,
        }}
      >
        {items.map((item, index) => {
          const isFocused = index === focusedIndex;

          return (
            <div
              key={item.id}
              className="flex-shrink-0 transition-all duration-300"
              style={{ width: `${ITEM_WIDTH}px` }}
            >
              <div
                className={`relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${
                  isFocused
                    ? "opacity-100 scale-110 z-10 border-4 border-white shadow-lg"
                    : "opacity-50 scale-100"
                }`}
              >
                <Image
                  src={item.images.artwork_portrait}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover"
                />
              </div>
              {isFocused && (
                <h3 className="text-white text-xl font-semibold mt-6 text-center">
                  {item.title}
                </h3>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
