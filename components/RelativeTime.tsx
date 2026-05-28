"use client";

import { useEffect, useState } from "react";
import { formatDateTime, relativeTime } from "@/lib/format";

export function RelativeTime({ iso }: { iso: string }) {
  const [text, setText] = useState(() => formatDateTime(iso));

  useEffect(() => {
    const update = () => setText(relativeTime(iso));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [iso]);

  return <span suppressHydrationWarning>{text}</span>;
}
