import React from 'react';
import { Link } from 'react-router-dom';

interface InsuranceInfoSectionProps {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  imageAlt?: string;
  showImageOnRight?: boolean;
  className?: string;
}

const InsuranceInfoSection: React.FC<InsuranceInfoSectionProps> = ({
  title,
  paragraphs,
  bulletPoints = [],
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt = "Insurance related image",
  showImageOnRight = true,
  className = '',
}) => {
  const hasImage = !!imageUrl && showImageOnRight;

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div
          className={`grid items-center gap-12 lg:gap-20 ${
            hasImage ? 'lg:grid-cols-2' : 'max-w-5xl mx-auto'
          }`}
        >
          {/* Text */}
          <div className={`space-y-6 ${hasImage ? 'order-2 lg:order-1' : ''}`}>
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-gray-900">
              {title}
            </h2>

            {/* Paragraphs */}
            {paragraphs.map((p, idx) => {
              const trimmed = p.trim();
              const isQuestion = trimmed.endsWith('?') && trimmed.length > 8;

              return (
                <p
                  key={idx}
                  className={
                    isQuestion
                      ? 'text-lg sm:text-xl font-medium text-gray-900'
                      : 'text-base sm:text-lg text-gray-600 leading-relaxed'
                  }
                >
                  {p}
                </p>
              );
            })}

            {/* Bullet Points */}
            {bulletPoints.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bulletPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 text-base sm:text-lg"
                  >
                    <span className="text-[#f59e0b] text-xl leading-none mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="pt-6">
              {buttonLink.startsWith('http') ||
              buttonLink.startsWith('tel:') ||
              buttonLink.startsWith('mailto:') ? (
                <a
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-3.5 rounded-lg text-base transition shadow-md uppercase tracking-wide"
                >
                  {buttonText}
                </a>
              ) : (
                <Link
                  to={buttonLink}
                  className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-3.5 rounded-lg text-base transition shadow-md uppercase tracking-wide"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          {hasImage && (
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-[min(80vh,640px)] lg:h-[min(90vh,760px)] object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceInfoSection;
