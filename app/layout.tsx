import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { ReactNode } from "react";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple and efficient application for managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description: "Simple and efficient application for managing personal notes.",
    url: "https://your-project.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <footer>
            <p>
              Created <time dateTime="2025">2025</time>
            </p>
          </footer>
        </TanStackProvider>
      </body>
    </html>
  );
}