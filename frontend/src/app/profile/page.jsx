"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";

import games from "../game/games_info.json";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState([null, null, null]);
  const [gameDetails, setGameDetails] = useState([null, null]);

  function toggleModal() {
    const dialogElement = document.getElementById("my_modal_3");
    if (dialogElement) {
      if (dialogElement.open) {
        dialogElement.close();
      } else {
        dialogElement.showModal();
      }
    }
  }

  async function getUserDetails() {
    try {
      const response = await axios.get("http://localhost:8000/auth/status", {
        withCredentials: true,
      });
      const { age, email, id, name } = response.data.user;
      setUserDetails([email, name]);
    } catch (error) {
      console.error("Failed to get status: ", error);
    }
  }
  async function frequentlyPLayed() {
    try {
      const response = await axios.get(
        "http://localhost:8000/scores/user/most_played",
        {
          withCredentials: true,
        }
      );
      setGameDetails([response.data.game_id, response.data.game_name]);
    } catch (error) {
      console.error("Failed to get status: ", error);
    }
  }

  function GameInfoModal(props) {
    const { game } = props;

    getUserDetails();
    frequentlyPLayed();
    return (
      <>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">{gameDetails[1]}</h3>
            <p className="py-4">{game.description}</p>
            <button className="btn btn-primary">Play</button>
          </div>
        </dialog>
      </>
    );
  }

  function UserInfo(props) {
    const { game } = props;
    console.log(games);

    return (
      <div className="hero-content text-center ">
        <div className="w-[500px]">
          <div className="flex w-full flex-col">
            <div className="card bg-base-300 rounded-box grid place-items-center p-3">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <div>
                <p className="leading-7 mb-2 [&:not(:first-child)]:mt-6">
                  {userDetails[1]}
                </p>
                <p className="text-sm text-zinc-700 leading-none">
                  {userDetails[0]}
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col text-left card bg-base-300 rounded-box p-6 space-y-3">
              <div className="flex flex-row w-full">
                <div className="flex flex-col flex-[1] pr-2">
                  <div className="font-medium">Most played game:</div>
                  <div className="font-medium">Score:</div>
                  <div className="font-medium">Date Registered:</div>
                </div>
                <div className="flex flex-col flex-[1.5] pl-2">
                  <div>
                    <a
                      onClick={toggleModal}
                      className="cursor-pointer hover:underline"
                    >
                      {game.name}
                    </a>
                  </div>
                  <div>100</div>
                  <div>Some date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TODO: find out the player's most played game.
  // make a call to the backend to get the player's most played game.
  const mostPlayedGame = games[Math.floor(Math.random() * games.length)];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/images/arcade.jpg)",
      }}
    >
      <UserInfo game={mostPlayedGame} />
      <GameInfoModal game={mostPlayedGame} />
    </div>
  );
}
