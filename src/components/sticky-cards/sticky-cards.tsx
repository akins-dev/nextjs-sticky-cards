import Image from "next/image";

const StickyCards = () => {
  const stickyCardsData = [
    {
      index: "03",
      title: "Kinetics",
      image: "/sticky-cards/card_3.jpg",
      description:
        "Motion conveys meaning, not just decoration. We define physics-based transitions that guide the eye, creating a seamless flow between interaction states without distraction.",
    },
    {
      index: "04",
      title: "Precision",
      image: "/sticky-cards/card_4.jpg",
      description:
        "Details define the whole. We obsess over pixel-perfect alignment and strict typographic grids to ensure that every component renders with absolute sharpness and intent.",
    },
    {
      index: "05",
      title: "Scalability",
      image: "/sticky-cards/card_5.jpg",
      description:
        "Built for growth. Our underlying frameworks are designed to expand effortlessly, accommodating new requirements and platforms while maintaining the core structural integrity.",
    },
  ];
  return (
    <div className="relative max-[1000px]:flex-col max-[1000px]:gap-0 w-full h-full bg-black text-white">
      {stickyCardsData.map((card, index) => (
        <div
          key={index}
          className="relative w-full h-svh flex p-6 gap-12 will-change-transform after:content-[''] after:absolute after:inset-0 after:bg-black/50 after:opacity-[var(--after-opacity,0)] after:transition-opacity after:duration-100 after:ease-out after:pointer-events-none after:z-[2]"
        >
          <div className="max-[1000px]:flex-1 flex-2">
            <h1>{card.index}</h1>
          </div>
          <div className=" flex-4 pt-6">
            <div className="sticky-card-content-wrapper max-[1000px]:w-full w-[75%] flex flex-col gap-6">
              <div className="sticky-card-header w-[75%]">{card.title}</div>
              <div className="sticky-card-image">
                <Image
                  height={500}
                  width={500}
                  alt="image"
                  src={`/sticky-cards/${index + 1}.jpeg`}
                  className="object-cover aspect-auto-[5/3]"
                />
              </div>
              <div className="sticky-card-copy max-[1000px]:flex-col max-[1000px]:gap-[0.5rem] flex gap-6">
                <div className="sticky-card-copy-title flex-2">
                  <p className="text-[1.125rem] font-medium">about the Stage</p>
                </div>
                <div className="sticky-card-copy-description flex-4">
                  <p className="text-[1.125rem] uppercase font-[650]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards;
