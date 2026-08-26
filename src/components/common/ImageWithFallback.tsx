import React, { useState } from 'react';

// Crisp inline SVGs for fallback when any image cannot be loaded
export const ARTICLE_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500"><rect width="800" height="500" fill="%230f172a"/><g stroke="%23334155" stroke-width="2" fill="none"><circle cx="400" cy="250" r="80"/><line x1="400" y1="40" x2="400" y2="460"/><rect x="60" y="40" width="680" height="420" rx="12"/><rect x="60" y="160" width="120" height="180"/><rect x="620" y="160" width="120" height="180"/></g><circle cx="400" cy="250" r="16" fill="%232563eb"/><text x="400" y="430" fill="%2394a3b8" font-family="system-ui,sans-serif" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="2">KIBEEZ TACTICAL DISPATCH</text></svg>`;

export const AVATAR_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" rx="100" fill="%231e293b"/><circle cx="100" cy="75" r="40" fill="%233b82f6"/><path d="M40 175 C40 130, 160 130, 160 175 Z" fill="%233b82f6"/></svg>`;

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'article' | 'avatar';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Kibeez media asset',
  className = '',
  fallbackType = 'article',
  onError,
  loading = 'lazy',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  const fallback = fallbackType === 'avatar' ? AVATAR_FALLBACK_SVG : ARTICLE_FALLBACK_SVG;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Prevent infinite loop if fallback fails
    e.currentTarget.onerror = null;
    setHasError(true);
    setImgSrc(fallback);
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={hasError ? fallback : imgSrc || fallback}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={handleError}
      {...rest}
    />
  );
};
