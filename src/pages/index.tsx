import { useSession } from "next-auth/react";

import Redirect from "@/components/Redirect";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading";

export default function Home() {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      {sessionData ? (
        <>
          <Header page={"Dashboard"} />
          <div className="flex mt-5 flex-col items-center justify-center">
            <div className="mt-2">
              <Dashboard />
            </div>
          </div>
        </>
      ) : (
        < Redirect />
      )}
    </>
  );
}