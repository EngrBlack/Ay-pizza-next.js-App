"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrderAlarm({ pollInterval = 8000 }) {
  const [count, setCount] = useState(null);
  const [muted, setMuted] = useState(false);
  const latestIdRef = useRef(null);
  const pollingRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // create and preload alarm audio from public folder
    try {
      audioRef.current = new Audio("/sound/order-alarm.mp3");
      audioRef.current.preload = "auto";
      // small attempt to load; browsers may block without user gesture
      audioRef.current.load();
    } catch (e) {
      audioRef.current = null;
    }

    async function fetchCount() {
      try {
        const res = await fetch("/api/orders/count");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;

        // initialize
        if (count === null) {
          setCount(data.count ?? 0);
          latestIdRef.current = data.latestId;
          return;
        }

        // New order detected if latestId changed or count increased
        const isNew =
          (data.latestId && data.latestId !== latestIdRef.current) ||
          (typeof data.count === "number" && data.count > count);

        if (isNew) {
          setCount(data.count);
          latestIdRef.current = data.latestId;
          // visual alert
          toast.success("New Order Received! 🛎️", { duration: 6000 });
          // play audio file if available and not muted
          try {
            if (!muted && audioRef.current) {
              // play() returns a promise; ignore rejections (autoplay policy)
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
          } catch (e) {
            // ignore audio errors
          }
        } else if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch (err) {
        // silent
      }
    }

    // initial fetch
    fetchCount();
    pollingRef.current = setInterval(fetchCount, pollInterval);

    return () => {
      mounted = false;
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [count, pollInterval]);

  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-brown text-cream-100 font-semibold">
        Orders: {count ?? "..."}
      </div>
      <button
        type="button"
        className="px-3 py-1 rounded-md border text-sm"
        onClick={() => setMuted((s) => !s)}
        title="Toggle alarm"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
      <button
        type="button"
        className="px-3 py-1 rounded-md border text-sm"
        onClick={async () => {
          // manual poll
          try {
            const res = await fetch("/api/orders/count");
            if (!res.ok) return;
            const data = await res.json();
            setCount(data.count ?? 0);
            latestIdRef.current = data.latestId;
            toast("Manual refresh", { icon: "🔄" });
            // play manual sound when not muted
            if (!muted && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
          } catch (e) {}
        }}
      >
        Refresh
      </button>
    </div>
  );
}
