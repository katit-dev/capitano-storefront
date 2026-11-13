import { useEffect, useState } from "react";
type Props = {
  startsAt?: string;
  endsAt?: string;
  showDigits?: boolean;
  compact?: boolean;
  onTick?: (now: number) => void;
};

export default function FlashSaleCountdown({ startsAt, endsAt, showDigits = true, compact = false, onTick }: Props) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => { const value = Date.now(); setNow(value); onTick?.(value); }, 1000);
    return () => window.clearInterval(timer);
  }, [onTick]);
  const start = Date.parse(startsAt || "");
  const end = Date.parse(endsAt || "");
  const upcoming = now < start;
  const remaining = Math.max(0, (upcoming ? start : Number.isFinite(end) ? end : now) - now);
  const seconds = Math.ceil(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor(seconds / 60) % 60;
  const parts = [[days, "Ngày"], [hours, "Giờ"], [minutes, "Phút"], [seconds % 60, "Giây"]] as const;
  const status = upcoming ? "Bắt đầu sau" : remaining > 0 ? "Kết thúc sau" : "Đã kết thúc";

  if (compact) {
    const clock = parts.slice(days || hours ? 1 : 2)
      .map(([value]) => String(value).padStart(2, "0")).join(":");
    return (
      <div className="flash-sale-countdown flash-sale-countdown--compact" role="timer" aria-label="Thời gian Flash Sale">
        <p>{status}</p>
        {showDigits && remaining > 0 && (
          <>
            <strong aria-hidden="true">{days > 0 ? `${days} ngày ` : ""}{clock}</strong>
            <span className="sr-only">{parts.filter(([value]) => value > 0).map(([value, label]) => `${value} ${label.toLowerCase()}`).join(" ")}</span>
          </>
        )}
      </div>
    );
  }

  return <div className="flash-sale-countdown" role="timer" aria-label="Thời gian Flash Sale"><p>{status}</p>
    {showDigits && <div className="flash-sale-countdown__digits">{parts.map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>}
  </div>;
}
