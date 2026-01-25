import React from "react";

// Bolka Original Logo - Orange sphere with white wave stripes
// Exact recreation of the original Bolka logo
export const BolkaLogo: React.FC<{ size: number }> = ({ size }) => {
  // Use unique IDs to avoid conflicts when multiple logos are rendered
  const gradientId = `bolkaOrange_${Math.random().toString(36).substr(2, 9)}`;
  const clipId = `circleClip_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        {/* Orange gradient matching the original */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8247" />
          <stop offset="50%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#E8592A" />
        </linearGradient>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      {/* Orange circle background */}
      <circle cx="50" cy="50" r="50" fill={`url(#${gradientId})`} />
      {/* White wave stripes - matching original curve pattern */}
      <g clipPath={`url(#${clipId})`}>
        {/* Curved wave stripes flowing diagonally from bottom-left to top-right */}
        <path
          d="M -15 8 C 10 5, 35 18, 55 12 C 75 6, 95 15, 115 10"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 22 C 10 18, 35 32, 55 26 C 75 20, 95 30, 115 25"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 36 C 10 32, 35 46, 55 40 C 75 34, 95 44, 115 39"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 50 C 10 46, 35 60, 55 54 C 75 48, 95 58, 115 53"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 64 C 10 60, 35 74, 55 68 C 75 62, 95 72, 115 67"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 78 C 10 74, 35 88, 55 82 C 75 76, 95 86, 115 81"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 92 C 10 88, 35 102, 55 96 C 75 90, 95 100, 115 95"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M -15 106 C 10 102, 35 116, 55 110 C 75 104, 95 114, 115 109"
          stroke="white"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    </svg>
  );
};

// WhatsApp Official Icon
export const WhatsAppIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Facebook Official Icon
export const FacebookIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Instagram Official Icon with gradient
export const InstagramIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <radialGradient id="igRadial" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path fill="url(#igRadial)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// TikTok Official Icon
export const TikTokIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#25F4EE" d="M9.37 23.5v-9.45c0-2.15 0-4.3.01-6.45 0-.31.04-.47.42-.57 1.67-.46 2.92-1.85 3.18-3.58h3.5c.02.19.06.37.06.56 0 1.32-.01 2.64.01 3.95.01.19.14.42.28.55.76.72 1.55 1.4 2.45 2.2v3.54c-1.67-.02-3.25-.5-4.7-1.34v6.83c0 1.02-.07 2.07-.31 3.05-.87 3.6-4.27 5.95-7.9 5.28-3.34-.62-5.63-3.3-5.76-6.7-.14-3.7 2.36-6.87 5.95-7.53.27-.05.54-.07.81-.1z"/>
    <path fill="#FE2C55" d="M9.37 23.5c-.27.03-.54.05-.81.1-3.59.66-6.09 3.83-5.95 7.53.13 3.4 2.42 6.08 5.76 6.7 3.63.67 7.03-1.68 7.9-5.28.24-.98.31-2.03.31-3.05v-6.83c1.45.84 3.03 1.32 4.7 1.34V20.5c-.9-.8-1.69-1.48-2.45-2.2-.14-.13-.27-.36-.28-.55-.02-1.31-.01-2.63-.01-3.95 0-.19-.04-.37-.06-.56h-3.5c-.26 1.73-1.51 3.12-3.18 3.58-.38.1-.42.26-.42.57-.01 2.15-.01 4.3-.01 6.45v9.66z"/>
    <path fill="white" d="M16.52 8.42c.76.72 1.55 1.4 2.45 2.2v3.54c-1.67-.02-3.25-.5-4.7-1.34v6.83c0 1.02-.07 2.07-.31 3.05-.87 3.6-4.27 5.95-7.9 5.28-3.34-.62-5.63-3.3-5.76-6.7-.14-3.7 2.36-6.87 5.95-7.53.27-.05.54-.07.81-.1V18c-1.89.33-3.31 1.89-3.31 3.8 0 2.12 1.72 3.84 3.84 3.84 2.12 0 3.84-1.72 3.84-3.84V6.45c0-.31.04-.47.42-.57 1.67-.46 2.92-1.85 3.18-3.58h3.5c.02.19.06.37.06.56 0 1.32-.01 2.64.01 3.95.01.19.14.42.28.55-.36.34-.36.72-.36 1.06z"/>
  </svg>
);

// Gmail/Email Official Icon
export const EmailIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6Z"/>
    <path fill="#EA4335" d="M22 6L12 13L2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z"/>
    <path fill="#FBBC05" d="M2 6L12 13L22 6"/>
    <path fill="#34A853" d="M2 6V18L12 13L2 6Z"/>
    <path fill="#C5221F" d="M22 6V18L12 13L22 6Z"/>
    <path fill="white" d="M12 13L2 6H22L12 13Z" opacity="0.2"/>
  </svg>
);

// SMS/iMessage Icon
export const SMSIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="smsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5AF158" />
        <stop offset="100%" stopColor="#32D74B" />
      </linearGradient>
    </defs>
    <path fill="url(#smsGrad)" d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"/>
    <circle cx="8" cy="10" r="1.5" fill="white"/>
    <circle cx="12" cy="10" r="1.5" fill="white"/>
    <circle cx="16" cy="10" r="1.5" fill="white"/>
  </svg>
);

// QR Code Icon
export const QRCodeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z"/>
  </svg>
);

// Print/Brochure Icon
export const PrintIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
  </svg>
);

// Professional stroke icons
export const MicIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const LinkIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const ShareIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const SparklesIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L14.5 8.5L20 9L16 13.5L17 19L12 16L7 19L8 13.5L4 9L9.5 8.5L12 3Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const ArrowRightIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CreditCardIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const CalendarIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const ClockIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const GlobeIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const PhoneOffIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const DollarIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const TargetIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
