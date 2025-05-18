"use client";
import React from 'react'; 

export default function ProfilePage() {
  function toggleModal() {
    const dialogElement = document.getElementById('my_modal_3');
    if (dialogElement) {
      if (dialogElement.open) {
        dialogElement.close(); 
      } else {
        dialogElement.showModal();
      }
    }
  }

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/images/arcade.jpg)",
      }}
    >
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
                  Username
                </p>
                <p className="text-sm text-zinc-700 leading-none">
                  email@email.com
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
                    <a onClick={toggleModal} className="cursor-pointer hover:underline">
                      Snake
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
      

      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}></button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Snake Game</h3>
          <p className="py-4">An awesome snake game</p>
          <button className="btn btn-primary">Play</button>
        </div>
      </dialog>
    </div>
  );
}