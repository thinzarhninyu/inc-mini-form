import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

const Header = ({ page }: { page: string }) => {
    const { data: sessionData } = useSession();
    return (
        <div className="z-50 sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-between">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href="/">
                            <Image src="/logo.jpg" alt="logo" width={40} height={40} />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Home</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <p>{page}</p>
            <div className="flex flex-col items-center justify-end gap-4">
                <div className="text-center text-2xl text-white">
                    {sessionData ? (
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Avatar>
                                                    <AvatarImage src={sessionData.user?.image ?? 'https://github.com/shadcn.png'} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel className="text-center">{sessionData.user?.name}</DropdownMenuLabel>
                                                <DropdownMenuLabel className="text-center">{sessionData.user?.email}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Button
                                                        className="px-10 py-3 font-semibold w-full"
                                                        onClick={() => void signOut()}
                                                    >
                                                        {"Sign out"}
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Account</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;