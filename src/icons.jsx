/* Single-family line icons — 1.5px stroke, currentColor, 24x24. */
const S = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const ArrowRight = (p) => (
  <S {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);
export const ArrowLeft = (p) => (
  <S {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </S>
);
export const Lock = (p) => (
  <S {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </S>
);
export const Check = (p) => (
  <S {...p}>
    <path d="M4 12.5l5 5 11-11" />
  </S>
);
export const Search = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </S>
);
export const Spark = (p) => (
  <S {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </S>
);
export const ChevronDown = (p) => (
  <S {...p}>
    <path d="M6 9l6 6 6-6" />
  </S>
);
export const ExternalLink = (p) => (
  <S {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </S>
);
export const Alert = (p) => (
  <S {...p}>
    <path d="M12 3.5l9.5 16.5H2.5z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </S>
);
export const X = (p) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </S>
);
export const Print = (p) => (
  <S {...p}>
    <path d="M7 9V4h10v5" />
    <rect x="4" y="9" width="16" height="8" rx="1.5" />
    <path d="M7 14h10v6H7z" />
  </S>
);
export const Shield = (p) => (
  <S {...p}>
    <path d="M12 3l8 3v6c0 4.5-3 7.8-8 9-5-1.2-8-4.5-8-9V6z" />
  </S>
);
export const Quote = (p) => (
  <S {...p}>
    <path d="M10 8H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3M20 8h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3" />
  </S>
);
export const Target = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
  </S>
);
export const Compass = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </S>
);
export const FileText = (p) => (
  <S {...p}>
    <path d="M14 3v5h5" />
    <path d="M6 3h8l5 5v13H6z" />
    <path d="M9 12h6M9 16h6" />
  </S>
);
export const Code = (p) => (
  <S {...p}>
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
  </S>
);
export const Grid = (p) => (
  <S {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
  </S>
);
export const Bot = (p) => (
  <S {...p}>
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 4v4M9 13h.01M15 13h.01" />
  </S>
);
export const TrendUp = (p) => (
  <S {...p}>
    <path d="M4 16l5-5 3 3 7-7" />
    <path d="M16 6h4v4" />
  </S>
);
