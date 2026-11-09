import { useEffect, useState } from "react";
type Props = { startsAt?: string; endsAt?: string; showDigits?: boolean; onTick?: (now: number) => void };
export default function FlashSaleCountdown({ startsAt, endsAt, showDigits = true, onTick }: Props) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => { const value = Date.now(); setNow(value); onTick?.(value); }, 1000);
    return () => window.clearInterval(timer);
  }, [onTick]);
  const start = Date.parse(startsAt || ""); const end = Date.parse(endsAt || ""); const upcoming = now < start;
  const remaining = Math.max(0, (upcoming ? start : Number.isFinite(end) ? end : now) - now);
  const seconds = Math.ceil(remaining / 1000);
  const parts = [[Math.floor(seconds / 86400), "Ngày"], [Math.floor(seconds / 3600) % 24, "Giờ"], [Math.floor(seconds / 60) % 60, "Phút"], [seconds % 60, "Giây"]] as const;
  return <div className="flash-sale-countdown" role="timer" aria-label="Thời gian Flash Sale"><p>{upcoming ? "Bắt đầu sau" : remaining > 0 ? "Kết thúc sau" : "Đã kết thúc"}</p>
    {showDigits && <div className="flash-sale-countdown__digits">{parts.map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>}
  </div>;
}
