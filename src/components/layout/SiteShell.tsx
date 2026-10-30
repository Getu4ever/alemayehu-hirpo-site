"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { MusicPlayerProvider } from "@/components/music/MusicPlayerProvider";
import { NowPlayingBar } from "@/components/music/NowPlayingBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { PageTransition } from "./PageTransition";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MusicPlayerProvider>
        <Preloader />
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <NowPlayingBar />
      </MusicPlayerProvider>
    </LanguageProvider>
  );
}
