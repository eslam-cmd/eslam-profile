// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "../../components/Others/ClientLayout.jsx";
import VisitorTracker from "../../components/Others/VisitorTracker.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Islam profile",
  description: "Islam profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>
          <VisitorTracker />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
