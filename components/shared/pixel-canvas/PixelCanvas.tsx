// components/PixelCanvas/PixelCanvas.tsx

'use client';

import React, { useEffect, useRef } from 'react';

class Pixel {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size: number;
  private sizeStep: number;
  private minSize: number;
  private maxSizeInteger: number;
  private maxSize: number;
  private delay: number;
  private counter: number;
  private counterStep: number;
  public isIdle: boolean;
  private isReverse: boolean;
  private isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear(): void {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear(): void {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  private shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
  className?: string;
}

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  colors = [
    "#A7D8D3",
    "#F1C6B8",
    "#D1C2E1",
    "#B3D9F2",
    "#F3E0D3"
  ],
  gap = 5,
  speed = 35,
  noFocus = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const getDistanceToCanvasCenter = (x: number, y: number, width: number, height: number): number => {
    const dx = x - width / 2;
    const dy = y - height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const createPixels = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const pixels: Pixel[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(x, y, canvas.width, canvas.height);
        pixels.push(new Pixel(canvas, ctx, x, y, color, speed * 0.001, delay));
      }
    }

    return pixels;
  };

  const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, fnName: 'appear' | 'disappear') => {
    const timeInterval = 1000 / 60;
    let timePrevious = performance.now();

    const animateFrame = () => {
      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious;

      if (timePassed < timeInterval) {
        animationRef.current = requestAnimationFrame(animateFrame);
        return;
      }

      timePrevious = timeNow - (timePassed % timeInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const pixel of pixelsRef.current) {
        pixel[fnName]();
      }

      if (pixelsRef.current.every((pixel) => pixel.isIdle)) {
        cancelAnimationFrame(animationRef.current!);
        return;
      }

      animationRef.current = requestAnimationFrame(animateFrame);
    };

    cancelAnimationFrame(animationRef.current!);
    animationRef.current = requestAnimationFrame(animateFrame);
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = parent.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    pixelsRef.current = createPixels(canvas, ctx);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(initCanvas);
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const parent = parentRef.current;
    const canvas = canvasRef.current;
    if (!parent || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseEnter = () => animate(ctx, canvas, 'appear');
    const handleMouseLeave = () => animate(ctx, canvas, 'disappear');
    const handleFocusIn = (e: FocusEvent) => {
      if (e.currentTarget === parent && !parent.contains(e.relatedTarget as Node)) {
        animate(ctx, canvas, 'appear');
      }
    };
    const handleFocusOut = (e: FocusEvent) => {
      if (e.currentTarget === parent && !parent.contains(e.relatedTarget as Node)) {
        animate(ctx, canvas, 'disappear');
      }
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    if (!noFocus) {
      parent.addEventListener('focusin', handleFocusIn);
      parent.addEventListener('focusout', handleFocusOut);
    }

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      if (!noFocus) {
        parent.removeEventListener('focusin', handleFocusIn);
        parent.removeEventListener('focusout', handleFocusOut);
      }
    };
  }, [noFocus]);

  return (
    <div ref={parentRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};