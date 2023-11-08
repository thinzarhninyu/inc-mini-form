import Dashboard from "@/components/Dashboard";
import { api } from "@/utils/api";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      {/* <div className="flex min-h-screen flex-col items-center justify-center">
        <Dashboard />
        <Link href="/form" className={buttonVariants({ variant: "outline" })}>New Form</Link>
      </div> */}
      <div className="sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-center">
        Dashboard
      </div>
      <div className="flex mt-5 flex-col items-center justify-center">
        <div className="mt-2">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
