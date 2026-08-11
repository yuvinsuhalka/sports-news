import React, { useEffect, useState } from "react";

function formatDateline() {
  const now = new Date();
  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} · ${time} IST`;
}

export default function Header() {
  const [dateline, setDateline] = useState(formatDateline());

  useEffect(() => {
    const id = setInterval(() => setDateline(formatDateline()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="masthead">
      <div className="masthead-row masthead-eyebrow">
        <span>JAIPUR SPORTS EDITION</span>
        <span className="masthead-live">
          <span className="live-dot" aria-hidden="true" /> LIVE
        </span>
      </div>
      <h1 className="masthead-title">SPORTS WIRE</h1>
      <div className="masthead-row masthead-dateline">
        <span>{dateline}</span>
        <span>VOL. 1 · DAILY SCORELINE</span>
      </div>
    </header>
  );
}
