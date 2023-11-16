import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Roboto_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

const font = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
})

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>INC MINI FORM</title>
        <meta name="description" content="INC MINI FORM" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <main className={font.className}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
