// import { signIn, signOut, useSession } from "next-auth/react";
// import Dashboard from "@/components/Dashboard";
// import Image from "next/image";
// import Link from "next/link";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button";

// export default function Home() {

//   return (
//     <>
//       <div className="sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-between">
//         <Link href="/">
//           <Image src="/logo.jpg" alt="logo" width={40} height={40} />
//         </Link>
//         Dashboard
//         <AuthShowcase />
//       </div>
//       <div className="flex mt-5 flex-col items-center justify-center">
//         <div className="mt-2">
//           <Dashboard />
//         </div>
//       </div>
//     </>
//   );
// }

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-end gap-4">
//       <div className="text-center text-2xl text-white">
//         {/* {sessionData && <span>Logged in as {sessionData.user?.name}</span>} */}
//         {sessionData ? (
//           <div>
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Avatar>
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>{sessionData.user?.name}</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Button
//                     className="px-10 py-3 font-semibold"
//                     onClick={() => void signOut()}
//                   >
//                     {"Sign out"}
//                   </Button>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         ) : (
//           <div>
//             <Button
//               className="px-10 py-3 font-semibold"
//               onClick={() => void signIn()}
//             >
//               {"Sign in"}
//             </Button>
//           </div>
//         )}
//       </div>

//     </div >
//   );
// }


import { signIn, signOut, useSession } from "next-auth/react";
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
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={40} height={40} />
        </Link>
        Dashboard
        <div className="flex flex-col items-center justify-end gap-4">
          <div className="text-center text-2xl text-white">
            {sessionData ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{sessionData.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        className="px-10 py-3 font-semibold"
                        onClick={() => void signOut()}
                      >
                        {"Sign out"}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
      {sessionData ? (
        <div className="flex mt-5 flex-col items-center justify-center">
          <div className="mt-2">
            <Dashboard />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full mt-64">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="flex justify-center items-center px-10 py-3 font-semibold"
              onClick={() => void signIn()}
            >
              {"Sign in"}
            </Button>
          </div>
        </div>

      )}
    </>
  );
}
