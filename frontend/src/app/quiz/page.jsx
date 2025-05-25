
"use client";
import React from 'react';
import Quiz from './quiz';
import locations from "./locations.json";



// shuffle(locations
export default function QuizPage() {
  return (
    <Quiz locations={ locations }/>
  );
}