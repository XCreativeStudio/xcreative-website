type MarkProps = {
  className?: string;
  /** Unique mask id — pass a different value if the mark appears twice on a page. */
  id?: string;
};

/**
 * The studio mark: a rounded plate with two tapered slits — a swoosh sweeping up
 * from the lower left and a notch entering from the right — leaving a horn and a
 * tail, like a stack of layers peeled apart.
 */
export function Mark({ className, id = "xc-mark" }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
        <rect x="-10" y="-10" width="120" height="120" fill="#fff" />
        <path d="M0 70 C 10 46 34 30 60 25 C 40 48 20 76 8 104 Z" fill="#000" />
        <path d="M104 32 C 88 36 72 41 58 47 C 72 45 88 43 104 42 Z" fill="#000" />
      </mask>
      <path
        d="M28 4 H74 A20 20 0 0 1 94 24 V74 A22 22 0 0 1 72 96 H24 A20 20 0 0 1 4 76 V28 A24 24 0 0 1 28 4 Z"
        mask={`url(#${id})`}
      />
    </svg>
  );
}
