import { Geist, Geist_Mono } from "next/font/google";
<link
  href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
  rel="stylesheet"
></link>;



export const metadata = {
  title: "Contact Page",
  description: "Contact me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
