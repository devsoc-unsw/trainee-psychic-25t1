"use client";

import { useRouter } from 'next/navigation';
import Carousel from "@/components/ui/carousel";
export default function GameCarousel() {
  const router = useRouter();

  const slideData = [
    {
      title: "Wordle",
      button: "Play Game",
      src: "https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
      path: "/wordle/choose"
    },
    {
      title: "Snake",
      button: "Play Game",
      src: "https://ih1.redbubble.net/image.454927831.7138/raf,360x360,075,t,fafafa:ca443f4786.u2.jpg",
      path: "/snake"
    },
    {
      title: "Minesweeper",
      button: "Play Game",
      src: "https://i.redd.it/zdhjzhyn68py.png",
      path: "/minesweeper"
    },
    {
      title: "Desert Whispers",
      button: "Play Game",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/game4"
    },
  ];

  const buttonClick = (slide) => {
    router.push(slide.path);
  };

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel 
        slides={slideData} 
        onButtonClick={(slide) => buttonClick(slide)}
      />
    </div>
  );
}
