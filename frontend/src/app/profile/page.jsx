import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center ">
        <div className="w-[500px]">
          <div className="flex w-full flex-col">
            <div className="card bg-base-300 rounded-box grid place-items-center p-3">
              <Avatar className="mb-3">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="leading-7 mb-2 [&:not(:first-child)]:mt-6">Username</p>
                <p className="text-sm text-zinc-700 leading-none">email@email.com</p>
              </div>
                           
            </div>
            <div className="divider"></div>
            <div className="flex flex-col text-left card bg-base-300 rounded-box p-6 space-y-3">
              <div className="flex flex-row w-full">
                <div className="flex flex-col flex-[2] pr-2">
                  <div className="font-medium">Most played game</div>
                  <div className="font-medium">Score</div>
                  <div className="font-medium">Date Registered</div>
                </div>
                <div className="flex flex-col flex-[1.5] pl-2">
                  <div className="whitespace-nowrap">Some game (modal)</div>
                  <div className="whitespace-nowrap">Some score</div>
                  <div className="whitespace-nowrap">Some date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}