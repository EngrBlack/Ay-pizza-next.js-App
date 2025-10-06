"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

export default function AdminOrderAlarm({ onNewOrder }) {
  const [count, setCount] = useState(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // preload audio
    audioRef.current = new Audio("/sound/order-alarm.mp3");

    async function initCount() {
      const { count } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true });
      setCount(count ?? 0);
    }

    initCount();

    // ✅ subscribe to inserts
    const channel = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setCount((prev) => (typeof prev === "number" ? prev + 1 : 1));

          // let parent know to refresh list
          if (onNewOrder) onNewOrder();

          toast.success("New Order Received! 🛎️", { duration: 6000 });

          if (!muted && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [muted, onNewOrder]);

  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-brown text-cream-100 font-semibold">
        Orders: {count ?? "..."}
      </div>

      <button
        className="px-3 py-1 rounded-md border text-sm"
        onClick={() => setMuted((s) => !s)}
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
