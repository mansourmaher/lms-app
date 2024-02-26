"use client"

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";


export const Confetti = () => {
  const  confetti  = useConfettiStore();

  if(!confetti.isOpen) return null
    return (
        <ReactConfetti
        className="fixed inset-0 z-50 pointer-events-none"
        numberOfPieces={500}
        recycle={false}
        gravity={0.1}
        wind={0.1}
        initialVelocityX={10}
        initialVelocityY={10}
        tweenDuration={1000}
        colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        onConfettiComplete={() => confetti.onClose()}
        />
    );
};
