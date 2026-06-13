"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { profile } from "@/lib/data";

function highlightPrice(text: string) {
  const parts = text.split(/(\d+\s*\.-\s*)/);
  return parts.map((part, i) =>
    /\d+\s*\.-\s*/.test(part) ? (
      <span key={i} className="font-semibold text-emerald-400">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function ProfileOverlay() {
  const [expanded, setExpanded] = useState(false);
  const caption = expanded ? profile.captionFull : profile.captionShort;
  const needsExpand = profile.captionFull.length > profile.captionShort.length;

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-20 w-full max-w-md p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
      <div className="pointer-events-auto">
        <div className="mb-3 flex items-center gap-3">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-white/20 object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">{profile.name}</span>
              <BadgeCheck className="h-4 w-4 fill-white text-black" aria-hidden />
            </div>
            <span className="text-xs text-white/60">{profile.following}</span>
          </div>
        </div>

        <p
          className={`text-sm leading-relaxed text-white/90 ${!expanded ? "line-clamp-2" : ""}`}
        >
          {highlightPrice(caption)}
          {needsExpand && (
            <>
              {" "}
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                className="text-white/70 underline-offset-2 hover:text-white hover:underline"
              >
                {expanded ? profile.seeLess : profile.seeMore}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
