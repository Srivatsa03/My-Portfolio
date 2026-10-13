"use client";

import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PALETTE_OPEN_EVENT } from "./command-palette";

export function CommandPaletteButton() {
    const [isMac, setIsMac] = useState(true);

    useEffect(() => {
        setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent));
    }, []);

    const open = () => window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));

    return (
        <button
            type="button"
            onClick={open}
            aria-label="Open command palette"
            className="glass-chip inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs text-foreground/75 transition-colors hover:text-foreground"
        >
            <IconSearch className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-full bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-[11px] leading-none">{isMac ? "⌘" : "Ctrl"}</span>
                K
            </kbd>
        </button>
    );
}
