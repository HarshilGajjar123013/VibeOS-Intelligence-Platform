// VibeOS Layout Root
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../src/components/layout/Footer/Footer";
import PrototypeController from "../src/components/PrototypeController/PrototypeController";
import RequestDemo from "../src/components/layout/RequestDemo/RequestDemo";
import "../src/styles/proto-controller.scss";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "VibeOS - Employee Experience Platform",
  description: "Modern, all-in-one employee experience and culture analytics platform designed to perfectly fit your business needs.",
  icons: {
    icon: "/assets/images/logo1.png",
    shortcut: "/assets/images/logo1.png",
    apple: "/assets/images/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <RequestDemo />
        <PrototypeController />
        <Footer />
      </body>
    </html>
  );
}
