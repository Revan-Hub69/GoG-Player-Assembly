import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOG Open Letter",
  description: "Community initiative for Guns of Glory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
