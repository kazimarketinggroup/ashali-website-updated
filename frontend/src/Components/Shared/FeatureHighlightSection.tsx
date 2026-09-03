import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureHighlightSectionProps {
  bgImage: string;
  title: string;
  description?: string;             // Optional intro paragraph
  bulletPoints?: string[];          // Bullet list (new!)
  buttonText: string;
  buttonLink: string;
  breadcrumb?: string;              // e.g. "Homepage / Residential Landlords"
  side?: 'left' | 'right';          // default: 'right'
  overlayColor?: string;            // default blue tint
  className?: string;
}

const FeatureHighlightSection: React.FC<FeatureHighlightSectionProps> = ({
  bgImage,
  title,
  description = '',
  bulletPoints = [],
  buttonText,
  buttonLink,
  breadcrumb,
  side = 'right',
  overlayColor = 'rgba(25, 79, 122, 0.62)', // dark blue overlay
  className = '',
}) => {
  const isRight = side === 'right';

  return (
    <section
      className={`relative w-full min-h-[min(70vh,560px)] md:min-h-[min(100vh,800px)] flex items-center bg-black overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Blue Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))',
        }}
      />

      {/* Content Card */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`max-w-lg lg:max-w-xl p-10 md:p-10 lg:p-12 rounded-2xl backdrop-blur-md bg-black/65 border border-gray-700/40 shadow-2xl text-white ${
            isRight ? 'ml-auto' : 'mr-auto'
          }`}
        >
          {/* Optional Breadcrumb */}
          {breadcrumb && (
            <div className="text-sm text-blue-300/70 mb-4 font-medium">
              {breadcrumb}
            </div>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-6">
            {title}
          </h2>

          {/* Intro Description (if provided) */}
          {description && (
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6">
              {description}
            </p>
          )}

          {/* Bullet Points (if provided) */}
          {bulletPoints.length > 0 && (
            <ul className="space-y-3 md:space-y-2 mb-8 text-gray-100 text-base md:text-lg">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-sm  mt-0.5">•</span>
                  <span className='text-base'>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Button */}
          {buttonLink.startsWith('http') || buttonLink.startsWith('tel:') || buttonLink.startsWith('mailto:') ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white px-8 py-4 rounded-lg text-base md:text-lg transition-colors shadow-lg uppercase tracking-wide"
            >
              {buttonText}
            </a>
          ) : (
            <Link
              to={buttonLink}
              className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white px-8 py-4 rounded-lg text-sm md:text-base transition-colors shadow-lg uppercase tracking-wide"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightSection;