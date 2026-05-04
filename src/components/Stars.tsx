import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5 text-warm" aria-label={`${value} stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < full ? <FaStar key={i} size={size} /> : <FaRegStar key={i} size={size} className="opacity-60" />
      )}
    </span>
  );
}

export function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const v = hover || value;
  return (
    <div className="inline-flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            type="button"
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="text-warm transition-transform hover:scale-110"
            aria-label={`Rate ${n} stars`}
          >
            {n <= v ? <FaStar size={22} /> : <FaRegStar size={22} className="opacity-60" />}
          </button>
        );
      })}
    </div>
  );
}
