import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Redirect = () => {

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="w-72 text-center">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-center items-center">
                            <Image src="/logo.jpg" alt="logo" width={100} height={100} />
                        </div>
                    </CardTitle>
                    <CardDescription className="font-bold">Sign in to continue</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        className="flex justify-center items-center px-10 py-3 font-semibold w-full"
                        onClick={() => void signIn()}
                    >
                        {"Sign in"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Redirect;