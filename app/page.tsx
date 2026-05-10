// app/page.tsx

"use client";

import { motion } from "framer-motion";
import UploadBox from "@/app/components/UploadBox";
import { getSounds } from "@/lib/getSounds";
import {
  Flame,
  Upload,
  Search,
  Heart,
  Play,
  Gamepad2,
  Laugh,
  Music2,
  Angry,
} from "lucide-react";
import { playSound } from "@/lib/audio";
import { useEffect, useState } from "react";

const trendingSounds = [
  { id: 1, title: "Vine Boom", plays: "2.1M", audioUrl: "14e4d50e-9fa7-4d8b-aedb-57675b05e6cb.mp3" },
  { id: 2, title: "Bruh", plays: "1.4M", audioUrl: "ffa7ea14-e5ae-44ca-b9ee-6830d0e4bee7.mp3" },
  { id: 3, title: "Sad Violin", plays: "890K", audioUrl: "14e4d50e-9fa7-4d8b-aedb-57675b05e6cb.mp3" },
  { id: 4, title: "FBI Open Up", plays: "740K", audioUrl: "ffa7ea14-e5ae-44ca-b9ee-6830d0e4bee7.mp3" },
];

const soundFeed = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Funny Meme ${i + 1}`,
  plays: `420K`,
}));

const categories = [
  { icon: Gamepad2, label: "Gaming" },
  { icon: Laugh, label: "Memes" },
  { icon: Music2, label: "TikTok" },
  { icon: Angry, label: "Rage" },
];

export default function HomePage() {
  const [sounds, setSounds] = useState<any[]>([]);
  
useEffect(() => {
  async function loadSounds() {
    const data = await getSounds();
    setSounds(data);
  }
  loadSounds();
}, []);
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-violet-600 p-2">
              <Music2 size={20} />
            </div>

            <h1 className="text-xl font-bold tracking-tight">
              MemeSounds
            </h1>
          </div>

          {/* SEARCH */}
          <div className="hidden w-[40%] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:flex">
            <Search size={18} className="text-zinc-400" />

            <input
              placeholder="Search meme sounds..."
              className="w-full bg-transparent outline-none placeholder:text-zinc-500"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">            
<UploadBox />
            <div className="h-10 w-10 rounded-full bg-zinc-800" />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700/20 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl text-5xl font-black leading-tight md:text-7xl"
          >
            Play Viral Meme Sounds Instantly
          </motion.h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            Discover trending meme sounds, reaction clips, gaming effects,
            and viral TikTok audio.
          </p>

          {/* SEARCH HERO */}
          <div className="mt-10 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
            <Search className="text-zinc-500" />

            <input
              placeholder="Search sounds..."
              className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-500"
            />

            <button className="rounded-xl bg-violet-600 px-5 py-2 font-medium hover:bg-violet-500">
              Search
            </button>
          </div>

          {/* TRENDING TAGS */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Vine Boom", "Bruh", "Sad Violin", "FBI Open Up"].map(
              (tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-violet-600"
                >
                  {tag}
                </button>
         
              )
            )}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center gap-3">
          <Flame className="text-orange-400" />
          <h2 className="text-3xl font-bold">Trending Today</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sounds.map((sound) => (
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              key={sound.id}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition"
            >
              <div className="mb-5 flex items-center justify-between">
                <button onClick={() => playSound(sound.audioUrl)} className="rounded-2xl bg-violet-600 p-4 transition group-hover:scale-110">
                  <Play fill="white" />
                </button>
                <button className="text-zinc-500 hover:text-pink-500">
                  <Heart />
                </button>
              </div>

              <h3 className="text-xl font-semibold">{sound.title}</h3>

              <p className="mt-2 text-sm text-zinc-500">
                {sound.plays} plays
              </p>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-1/2 bg-violet-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-8 text-3xl font-bold">
          Explore Categories
        </h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={cat.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-violet-600"
            >
              <cat.icon />
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* VIRAL FEED */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Viral Sounds</h2>

          <button className="text-violet-400 hover:text-violet-300">
            View All
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {soundFeed.map((sound) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={sound.id}
              className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <button className="rounded-xl bg-violet-600 p-3">
                  <Play fill="white" size={18} />
                </button>

                <Heart
                  size={18}
                  className="text-zinc-500 hover:text-pink-500"
                />
              </div>

              <h3 className="font-semibold">{sound.title}</h3>

              <p className="mt-2 text-sm text-zinc-500">
                {sound.plays} plays
              </p>

              <div className="mt-4 h-1 rounded-full bg-zinc-800">
                <div className="h-full w-1/3 rounded-full bg-violet-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-700/20 to-fuchsia-700/10 p-10 text-center backdrop-blur-xl">
          <Upload
            className="mx-auto mb-6 text-violet-400"
            size={48}
          />

          <h2 className="text-4xl font-bold">
            Upload Your Meme Sounds
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Share your funniest sounds, reaction clips, and viral
            audio with the community.
          </p>

          <button className="mt-8 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500">
            Upload Sound
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div>
            <h3 className="text-xl font-bold">MemeSounds</h3>

            <p className="mt-2 text-sm text-zinc-500">
              Viral meme sounds for gamers, creators, and fun.
            </p>
          </div>

          <div className="flex gap-6 text-zinc-400">
            <a href="#">Trending</a>
            <a href="#">Categories</a>
            <a href="#">Privacy</a>
            <a href="#">DMCA</a>
          </div>
        </div>
      </footer>

      {/* FLOATING PLAYER */}
      <div className="fixed bottom-5 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Now Playing</p>
            <p className="text-sm text-zinc-400">
              Vine Boom Sound
            </p>
          </div>

          <button className="rounded-full bg-violet-600 p-4 hover:bg-violet-500">
            <Play fill="white" />
          </button>
        </div>
      </div>
    </main>
  );
}