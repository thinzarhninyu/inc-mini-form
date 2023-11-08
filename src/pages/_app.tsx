import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Roboto_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton"

import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

const font = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>

      <Head>
        <title>INC MINI FORM</title>
        <meta name="description" content="INC MINI FORM" />
        <link rel="icon" href="/logo.jpg" />
      </Head>


      <SignedIn>
        <main className={font.className}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider >
  );
};

export default api.withTRPC(MyApp);
