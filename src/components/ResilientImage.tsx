import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fit?: 'contain' | 'cover';
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fit = 'contain',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-[var(--bg-surface)] text-[var(--text-muted)] ${containerClassName}`}
      >
        <ImageIcon className="w-7 h-7 mb-2 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium max-w-[24ch] truncate">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[var(--bg-surface)] ${containerClassName}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--bg-surface)] animate-pulse"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full transition-opacity duration-150 ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};
