import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./pagecomponants/nav";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bracketiser",
  description: "A tool to make head-to-head lists.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body>
          <Nav />
          <SignedOut></SignedOut>
          <SignedIn>
            <div className="wrappercontent">
              <div className="container">{children}</div>
            </div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
