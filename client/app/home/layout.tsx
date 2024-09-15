import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "../GlobalRedux/Providers";

export const metadata: Metadata = {
  title: "chat bot",
  description: "Ask any product you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Providers>
             {children}
        </Providers>
      </body>
    </html>
  );
}
