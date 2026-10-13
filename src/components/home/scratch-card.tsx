"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconRefresh } from "@tabler/icons-react";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { data } from "@/data/data";

const emojiUrl = (codepoint: string) =>
  `https://fonts.gstatic.com/s/e/notoemoji/latest/${codepoint}/512.webp`;

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// How long a revealed card stays up before the next one is dealt.
const HOLD_MS = 4500;

// A lottery-style card: scratch the foil off to find a character and a line,
// then the foil goes back on over the next one.
export function ScratchCard() {
  const deck = data.scratchCards;
  const { resolvedTheme } = useTheme();
  // Shuffled after mount so server and client render the same (empty) card.
  const [order, setOrder] = useState<number[] | null>(null);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => setOrder(shuffled(deck.length)), [deck.length]);

  const card = order ? deck[order[pos % order.length]] : null;
  const next = order ? deck[order[(pos + 1) % order.length]] : null;

  // Fetch the next character early so it's ready when the foil goes back on.
  useEffect(() => {
    if (next) new window.Image().src = emojiUrl(next.emoji);
  }, [next]);

  const deal = useCallback(() => {
    setRevealed(false);
    setPos((p) => p + 1);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const id = setTimeout(deal, HOLD_MS);
    return () => clearTimeout(id);
  }, [revealed, deal]);

  const dark = resolvedTheme === "dark";

  return (
    <div className="relative flex flex-1 flex-col">
      <ScratchToReveal
        minScratchPercentage={35}
        resetKey={pos}
        label="Scratch me ✦"
        gradientColors={dark ? ["#3c4479", "#5d4383", "#7a5262"] : ["#d6dbf8", "#f1d6ec", "#f8e4cf"]}
        labelColor={dark ? "rgb(255 255 255 / 0.8)" : "rgb(40 32 72 / 0.72)"}
        onComplete={() => setRevealed(true)}
        className="flex min-h-[9.5rem] flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-foreground/[0.04] px-3 py-3 text-center"
      >
        {card && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={emojiUrl(card.emoji)}
              alt={card.name}
              width={72}
              height={72}
              draggable={false}
              className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
            />
            <p className="text-balance text-xs font-medium leading-snug text-foreground sm:text-sm">{card.line}</p>
          </>
        )}
      </ScratchToReveal>
      <button
        type="button"
        onClick={deal}
        aria-label="Deal another card"
        title="Another one"
        className="glass-chip group absolute right-1.5 top-1.5 z-20 rounded-full p-1.5 text-foreground/70 transition-colors hover:text-foreground"
      >
        <IconRefresh className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>
    </div>
  );
}
