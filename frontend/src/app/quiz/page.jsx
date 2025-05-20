
"use client";
import React from 'react';
import Quiz from './quiz';
import locations from "./locations.json";

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// shuffle(locations
export default function QuizPage() {
  return (
    <Quiz locations={ locations }/>
  );
}