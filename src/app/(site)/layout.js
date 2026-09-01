// src/app/layout.js
<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "../../components/Others/ClientLayout.jsx";
import VisitorTracker from "../../components/Others/VisitorTracker.jsx"; // أضف هذا
=======

import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "../../components/Others/ClientLayout.jsx";
>>>>>>> 4c73d5cd024798fc128efd0d1dfb94d1aa36d90e

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
      <head>
<<<<<<< HEAD
=======
        {/* يمكنك إضافة خط Lobster هنا عبر <link> داخل head */}
>>>>>>> 4c73d5cd024798fc128efd0d1dfb94d1aa36d90e
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
<<<<<<< HEAD
        <ClientLayout>
          {/* إضافة متتبع الزوار */}
          <VisitorTracker />
          {children}
        </ClientLayout>
=======
        <ClientLayout>{children}</ClientLayout>
>>>>>>> 4c73d5cd024798fc128efd0d1dfb94d1aa36d90e
      </body>
    </html>
  );
}
