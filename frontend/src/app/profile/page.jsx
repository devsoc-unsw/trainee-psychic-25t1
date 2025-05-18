import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <div className="flex w-full flex-col">
                    <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        Username
                        UserId
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col items-start text-left card bg-base-300 rounded-box grid h-20 place-items-center">
                        <div className="w-full">
                            <div className="flex flex-row">
                                <div className="flex flex-3">
                                    Most played game: 
                                </div>

                                <div className="flex flex-1">
                                    (game)
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            Score: (date)
                        </div>

                        <div className="w-full">
                            Register date: (date)
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )

}