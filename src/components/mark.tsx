type MarkProps = {
  className?: string;
  /** Unique mask id — pass a different value if the mark appears twice on a page. */
  id?: string;
};

/** The studio mark: a squircle with a tapered slice, split like a stack of layers. */
export function Mark({ className, id = "xc-mark" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" fill="#fff" />
        <path d="M-1 33 C 7 22 18 11 33 -1 C 18 6 6 19 -1 28 Z" fill="#000" />
      </mask>
      <rect x="1.8" y="1.8" width="28.4" height="28.4" rx="10.4" mask={`url(#${id})`} />
    </svg>
  );
}
