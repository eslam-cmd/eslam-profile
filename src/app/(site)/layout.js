// src/app/layout.js
import ClientLayout from "../../components/Others/ClientLayout.jsx";
import VisitorTracker from "../../components/Others/VisitorTracker.jsx";
// import localFont from 'next/font/local';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff2', // Make sure the file name is correct
//   variable: '--font-geist-sans',
//   display: 'swap',
// });

// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff2', // Make sure the file name is correct
//   variable: '--font-geist-mono',
//   display: 'swap',
// });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eslam-profile.vercel.app";

export const metadata = {
  title: {
    default: "Islam Hadaya | Freelance Web Developer - Next.js, Node.js, PostgreSQL",
    template: "%s | Islam Hadaya - Web Developer",
  },
  description:
    "Islam Hadaya, a web developer specialized in building SaaS platforms and web applications using Next.js, Node.js, and PostgreSQL. I provide comprehensive web development services for businesses and individuals in Aleppo, Syria, and the Arab world.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  keywords: [
    // Name & Identity
    "Islam Hadaya",
    "Islam Hadaya",
    "Islam Hadaya",
    "Islam Profile",
    "Islam Profile",
    "Islam Canada",
    "Islam Canada",
    "Islam Syria",
    "Islam Syria",
    "Islam Aleppo",
    "Islam Aleppo",

    // Job Title
    "Web Developer",
    "Web Developer",
    "Full-Stack Developer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Frontend Developer",
    "Backend Developer",
    "Backend Developer",

    // Technologies
    "Next.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Node.js Developer",
    "React Developer",
    "React Developer",
    "PostgreSQL Developer",
    "TypeScript",
    "JavaScript",

    // Services
    "Programming Services",
    "Programming Services",
    "App Development",
    "App Development",
    "Platform Development",
    "Platform Development",
    "SaaS Development",
    "SaaS Development",
    "Web Development Services",
    "Web Development Services",
    "Freelance Developer",
    "Freelance Developer",
    "Freelancer Syria",
    "Freelancer Syria",

    // Location
    "Aleppo",
    "Aleppo",
    "Syria",
    "Syria",
    "Syrian Developer",
    "Syrian Developer",
    "Arab Developer",
    "Arab Developer",

    // Other fields
    "Coding",
    "Coding",
    "Web Design",
    "Web Design",
    "UI/UX",
    "API Development",
    "API Development",
    "Database Design",
    "Database Design",
    "E-commerce Development",
    "E-commerce Development",

    // General words
    "Coding",
    "Technology",
    "Technology",
    "Software Engineer",
    "Software Engineer",
    "Code",
    "Code",
    "Developer Portfolio",
    "Developer Portfolio",
  ],
  authors: [{ name: "Islam Hadaya", url: "https://github.com/eslam-cmd" }],
  creator: "Islam Hadaya",
  publisher: "Islam Hadaya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Islam Hadaya | Freelance Web Developer - Next.js, Node.js, PostgreSQL",
    description:
      "Islam Hadaya, a web developer specialized in building SaaS platforms and web applications. I provide comprehensive web development services in Aleppo, Syria, and the Arab world.",
    url: siteUrl,
    siteName: "Islam Hadaya | Web Developer",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Islam Hadaya - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Hadaya | Freelance Web Developer",
    description:
      "Islam Hadaya, a web developer specialized in building SaaS platforms and web applications",
    images: ["/og-image.jpg"],
    creator: "@eslam_hadaya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google95cc1245a4caed06",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Additional Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A1F44" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Canonical Link */}
        <link rel="canonical" href={siteUrl} />

        {/* RSS Feed (Optional) */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Islam Hadaya"
          href="/feed.xml"
        />

        {/* Additional Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Islam Hadaya | Web Developer" />
        <meta property="og:locale" content="ar_SY" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@eslam_hadaya" />
        <meta name="twitter:creator" content="@eslam_hadaya" />

        {/* Schema Markup (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Islam Hadaya",
              givenName: "Islam",
              familyName: "Hadaya",
              jobTitle: "Full-Stack Web Developer",
              description:
                "Web developer specialized in building SaaS platforms and web applications using Next.js, Node.js, and PostgreSQL",
              url: "https://eslam-profile.vercel.app",
              sameAs: [
                "https://github.com/eslam-cmd",
                "https://www.linkedin.com/in/eslam-hd-60a056357",
                "https://www.facebook.com/islam.hadaya.2025",
                "https://x.com/eslam_hadaya",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Aleppo",
                addressCountry: "Syria",
              },
              knowsAbout: [
                "Next.js",
                "React",
                "Node.js",
                "Express",
                "PostgreSQL",
                "TypeScript",
                "JavaScript",
                "Docker",
                "AWS",
                "MUI",
                "Tailwind CSS",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance Web Developer",
                description: "Comprehensive web development services",
              },
            }),
          }}
        />

        {/* Schema Markup for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Islam Hadaya - Web Developer",
              url: "https://eslam-profile.vercel.app",
              logo: "https://eslam-profile.vercel.app/logo.png",
              description:
                "Comprehensive web development services using Next.js, Node.js, and PostgreSQL",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Aleppo",
                addressCountry: "Syria",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hdayaaslam34@gmail.com",
                contactType: "sales",
                availableLanguage: ["Arabic", "English"],
              },
            }),
          }}
        />
      </head>
      <body >
        <ClientLayout>
          <VisitorTracker />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}