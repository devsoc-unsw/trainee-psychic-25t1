"use client";

import { useRouter } from 'next/navigation';
import Carousel from "@/components/ui/carousel";
export default function GameCarousel() {
  const router = useRouter();

  const slideData = [
    {
      title: "Wordle",
      button: "Play Game",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/wordle/choose"
    },
    {
      title: "Snake",
      button: "Play Game",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/snake"
    },
    {
      title: "Neon Nights",
      button: "Play Game",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/game3"
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
