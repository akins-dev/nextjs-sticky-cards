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
    title: "The First Card",
    description:
      "This card will stick to the top. As you scroll, it will scale down, rotate slightly, and fade into the background.",
    image:
      "https://images.unsplash.com/photo-1629904853716-f004b377c81b?q=80&w=2000&auto=format&fit=crop",
    color: "#292929",
  },
  {
    id: "02",
    title: "Dynamic Scaling",
    description:
      "Notice how the image maintains its aspect ratio while the content layout shifts responsibly to fit different screen sizes.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    color: "#1a1a1a",
  },
  {
    id: "03",
    title: "Smooth Animations",
    description:
      "We use GSAP to interpolate the scale and rotation values based on the scroll position of the NEXT card.",
    image:
      "https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=2000&auto=format&fit=crop",
    color: "#292929",
  },
  {
    id: "04",
    title: "The Final Card",
    description:
      "The last card simply scrolls into view and covers the stack, finishing the sequence smoothly.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
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
        // The last card doesn't need to scale down or stick, it just scrolls on top
        if (index < cards.length - 1) {
          // Calculate a random slight rotation for that "organic" stack feel
          // Odd index rotates left, even rotates right
          // const rotation = index % 2 === 0 ? 5 : -5;

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: `top top`, // Pin for exactly 1 viewport height
            pin: true,
            pinSpacing: false, // This is crucial: allows the next card to overlap
            scrub: true, // Links animation to scroll speed
            // animation: gsap.to(card, {
            //   scale: 0.9, // Scale down slightly
            //   rotation: rotation, // Tilt
            //   ease: "none",
            // }),
          });
        }

        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25; // Scale down to 0.9
              const rotation = (index % 2 === 0 ? 5 : -5) * progress; // Rotate up to ±5 degrees
              const afterOpacity = progress;

              gsap.to(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
                // rotationX: 10, // 1. Tilt the bottom away
                // transformPerspective: 1000, // 2. Tell the browser to render it in 3D space
                // transformOrigin: "center top", // 3. Pin it at the top edge
              });
            },
          });
        }

        // Animate the "Dark Overlay" opacity
        // This mimics the card getting darker as it goes back in the stack
        gsap.to((card as HTMLElement).querySelector(".card-overlay"), {
          opacity: 0.6, // Final darkness opacity
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: `+=${window.innerHeight}`,
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <main className="bg-black min-h-screen text-white" ref={container}>
      {/* Intro Section */}
      <section className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
          Sticky Scroll
        </h1>
        <p className="text-gray-400">Scroll down to see the effect</p>
      </section>

      {/* Sticky Cards Container */}
      <div className="relative w-full">
        {CARDS.map((card, index) => (
          <div
            key={card.id}
            className="sticky-card h-screen w-full flex items-center justify-center sticky top-0"
          >
            {/* The Card Itself 
               - Uses Tailwind for styling 
               - 'relative' is needed for the overlay to position correctly
            */}
            <div className="relative w-full h-full bg-[#F4F4F4] text-black overflow-hidden flex flex-col md:flex-row shadow-2xl origin-top">
              {/* Dark Overlay (The "Vanilla CSS" Trick) 
                   - We use a simple div instead of pseudo-elements for easier GSAP targeting
                   - Starts at opacity-0, GSAP animates it to opacity-40
                */}
              <div className="card-overlay absolute inset-0 bg-black opacity-0 z-20 pointer-events-none" />

              {/* Left: Index & Content */}
              <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between relative z-10">
                <div>
                  <span className="text-4xl font-mono text-gray-400 mb-4 block">
                    ({card.id})
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase leading-[0.9] tracking-tight">
                    {card.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mt-8 md:mt-0">
                  {card.description}
                </p>
              </div>

              {/* Right: Image */}
              <div className="relative w-full md:w-[60%] h-[40vh] md:h-full bg-gray-200">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center bg-[#111]">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-500">
          End of Stack.
        </h2>
      </section>
    </main>
  );
}
