"use client";

import { useEffect, useRef, useState } from 'react';

type Props = {
  images: string[];
  interval?: number;
};

export default function ImageSlider({ images, interval = 5000 }: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!images.length) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, images, interval]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  if (!images.length) {
    return (
      <div className="slider empty">
        <div className="slider-empty">
          <p>Drop landscape images into <code>public/landscapes/</code> to show the slider.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slider">
      <img className="slide" src={images[index]} alt={`Slide ${index + 1}`} />
      <div className="slider-controls">
        <button aria-label="Previous" className="nav" onClick={prev}>
          &lt;
        </button>
        <div className="dots">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button aria-label="Next" className="nav" onClick={next}>
          &gt;
        </button>
      </div>
    </div>
  );
}
