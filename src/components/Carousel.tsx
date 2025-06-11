// ✅ src/components/Carousel.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/carousel1.jpg',
  '/carousel2.jpg',
  '/carousel3.jpg',
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-hidden relative">
      <div
        className="flex w-[300vw] transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            width={1920}
            height={1080}
            className="w-screen h-[calc(100vh-120px)] object-cover flex-shrink-0"
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

