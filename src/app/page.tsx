"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "01",
    title: "Discovery & Vision",
    description:
      "We begin by deconstructing your needs. Through deep consultation, we establish the functional requirements and aesthetic direction for the project.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    color: "#292929",
  },
  {
    id: "02",
    title: "Schematic Design",
    description:
      "Concepts become tangible. We produce detailed architectural drawings and 3D visualizations to ensure the spatial flow aligns with your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", 
    color: "#1a1a1a",
  },
  {
    id: "03",
    title: "Technical Execution",
    description:
      "Precision in the build phase. We oversee contractors and material sourcing, ensuring that the structural integrity matches the visual fidelity.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop", 
    color: "#292929",
  },
  {
    id: "04",
    title: "Handover & Curation",
    description:
      "The final layer. We manage the installation of fixtures and furnishings, delivering a turnkey environment ready for immediate habitation.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", 
    color: "#1a1a1a",
  },
];

export default function StickyCards() {
  const container = useRef(null);

  // 1. Setup Lenis for smooth scrolling (Essential for sticky effects)
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // 2. GSAP Animation Logic
  useGSAP(
    () => {
      const cards = document.querySelectorAll(".sticky-card");

      cards.forEach((card, index) => {
        // 1. PINNING LOGIC
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top -20px", // Card pins slightly above view
            endTrigger: cards[cards.length - 1],
            end: `top top`,
            pin: true,
            pinSpacing: false,
            scrub: true,
          });
        }

        // 2. ANIMATION LOGIC (The Rotation/Scale)
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[index + 1],
            // "top 90%" means: Start when the top of the NEXT card
            // is 10% down the viewport
            start: "top 90%",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.to(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
                ease: "power1.out", // Ease for smoother feel
                overwrite: "auto",
              });
            },
          });
        }

        // 3. OVERLAY LOGIC (Darkening)
        const isLastCard = index === cards.length - 1;
        // No overlay for the last card
        if (isLastCard) return;

        gsap.to((card as HTMLElement).querySelector(".card-overlay"), {
          scrollTrigger: {
            trigger: cards[index + 1], // Sync overlay with next card movement too
            start: "top 90%", // Sync start with the rotation delay
            end: "top top",
            scrub: true,
          },
          opacity: 0.6,
        });
      });
    },
    { scope: container }
  );

  return (
    <main className="bg-black min-h-screen text-white" ref={container}>
      {/* Intro Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
          fill
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop"
            alt="Modern Architecture"
            className="w-full h-full object-cover opacity-60"
          />
          {/* subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
          {/* Hero Typography */}
          <div className="grow flex flex-col justify-center md:justify-start mt-10 md:mt-20">
            <h1 className="text-[9vw] leading-[0.9] font-semibold tracking-tighter uppercase wrap-break-words">
              Overview of <br />
              Our 4-Stage <br />
              Process
            </h1>
          </div>

          {/* Bottom Right Arrow */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12">
            <div className="text-[8vw] leading-none font-semibold tracking-tighter opacity-90">
              (↓)
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Cards Container */}
      <div className="relative w-full">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="sticky-card h-screen w-full flex items-center justify-center sticky top-0"
          >
            <div className="relative w-full h-full bg-[#F4F4F4] text-black overflow-hidden flex flex-col shadow-2xl origin-top border-t border-black/10">
              <div className="card-overlay absolute inset-0 bg-black opacity-0 z-20 pointer-events-none" />

              <div className="w-full h-full p-6 md:p-12 flex flex-col md:grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] gap-8 relative z-10">
                {/* INDEX NUMBER - Stays at top left */}
                <div className="flex items-start justify-start">
                  <span className="text-6xl md:text-9xl uppercase font-bold tracking-tighter opacity-30 md:opacity-100">
                    ({card.id})
                  </span>
                </div>

                {/* CONTENT WRAPPER */}
                <div className="flex flex-col justify-start h-full gap-4 md:gap-6 md:mt-4">
                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl font-semibold uppercase leading-[0.9] tracking-tighter">
                    {card.title}
                  </h2>

                  {/* Image - Removed bottom margin */}
                  <div className="relative w-full aspect-video md:aspect-video md:h-[40vh] bg-gray-200 border border-black/10">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-lg text-gray-600 w-full md:w-[90%] leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center bg-[#111]">
        <h2 className="text-4xl md:text-6xl font-semibold uppercase leading-[0.9] tracking-tighter">
          End of Process Overview
        </h2>
      </section>
    </main>
  );
}
