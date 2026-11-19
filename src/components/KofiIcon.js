/**
 * A cup with a heart, in Ko-fi's coral. Drawn for this site rather than
 * copied from Ko-fi's artwork, so it reads as "Ko-fi" next to the label
 * without reproducing their logo file.
 */
export default function KofiIcon({ className, size = 20, ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path
        d="M3 6.5h14V13a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V6.5Z"
        fill="#FF5E5B"
      />
      <path
        d="M17 8.5h1.25a2.75 2.75 0 0 1 0 5.5H17"
        stroke="#FF5E5B"
        strokeWidth="2"
      />
      <path
        d="M10 15.4s-3.3-1.9-3.3-4.1a1.75 1.75 0 0 1 3.3-.85 1.75 1.75 0 0 1 3.3.85c0 2.2-3.3 4.1-3.3 4.1Z"
        fill="#fff"
      />
    </svg>
  );
}
