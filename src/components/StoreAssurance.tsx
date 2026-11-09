type AssuranceKind = "authentic" | "price" | "shipping" | "advice";

function AssuranceIcon({ kind }: { kind: AssuranceKind }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "authentic" && (
        <>
          <path d="m27 51-7 19 10-4 6 8 6-19m9-4 7 19-10-4-6 8-6-19" />
          <path d="M40 8c4-5 7 2 12 1 6-2 5 6 10 8 6 1 1 8 5 12 4 4-3 7-2 12 2 6-6 5-8 10-1 6-8 1-12 5-4 4-7-3-12-2-6 2-5-6-10-8-6-1-1-8-5-12-4-4 3-7 2-12-2-6 6-5 8-10 1-6 8-1 12-5Z" />
          <circle cx="40" cy="32" r="18" />
          <path d="M44 36a8 8 0 1 1 3-7m-8 4 9 8" />
          <circle cx="58" cy="49" r="9" />
          <path d="m54 49 3 3 5-6" />
        </>
      )}
      {kind === "shipping" && (
        <>
          <path d="M9 23H3m6 6H1m8 6H4m5 6H2m16 15h-6V18h36v38H31m17 0h9m13 0h5V42l-9-13H48" />
          <path d="M53 33h10l6 9H53Z" />
          <circle cx="24" cy="57" r="7" />
          <circle cx="64" cy="57" r="7" />
          <circle cx="24" cy="57" r="2" />
          <circle cx="64" cy="57" r="2" />
          <text
            x="18"
            y="36"
            fill="currentColor"
            stroke="none"
            fontSize="12"
            fontWeight="700"
          >
            FREE
          </text>
        </>
      )}
      {kind === "advice" && (
        <>
          <path d="M14 43V31a26 26 0 0 1 52 0v12M20 44V32a20 20 0 0 1 40 0v12M65 57c0 10-8 14-20 14" />
          <rect x="8" y="35" width="12" height="24" rx="5" />
          <rect x="60" y="35" width="12" height="24" rx="5" />
          <rect x="34" y="67" width="12" height="7" rx="3.5" />
          <path d="M55 34a15 15 0 0 1-15 15h-4l-9 6 2-10a15 15 0 1 1 26-11Z" />
          <circle cx="34" cy="34" r=".8" />
          <circle cx="40" cy="34" r=".8" />
          <circle cx="46" cy="34" r=".8" />
        </>
      )}
      {kind === "price" && (
        <>
          <path d="M12 38 38 12h26v26L38 64 12 38Z" />
          <circle cx="54" cy="22" r="4" />
          <path d="m28 47 18-18" />
          <circle cx="29" cy="31" r="4" />
          <circle cx="45" cy="47" r="4" />
        </>
      )}
    </svg>
  );
}

const assurances: { kind: AssuranceKind; lines: [string, string] }[] = [
  { kind: "authentic", lines: ["100%", "chính hãng"] },
  { kind: "price", lines: ["Giá cả", "ưu đãi"] },
  { kind: "shipping", lines: ["Miễn phí", "vận chuyển"] },
  { kind: "advice", lines: ["Hỗ trợ", "tư vấn da"] },
];

export default function StoreAssurance() {
  return (
    <section className="store-assurance" aria-label="Cam kết mua hàng">
      <div className="container-wide store-assurance__grid">
        {assurances.map(({ kind, lines }) => (
          <article key={kind}>
            <div className="store-assurance__icon">
              <AssuranceIcon kind={kind} />
            </div>
            <p>
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
