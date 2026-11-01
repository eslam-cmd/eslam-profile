// src/app/layout.js
import ClientLayout from "../../components/Others/ClientLayout.jsx";
import VisitorTracker from "../../components/Others/VisitorTracker.jsx";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eslam-profile.vercel.app";

export const viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Islam Hadaya (إسلام هدايا) | Full-Stack Web Developer - Next.js, NestJS, Laravel",
    template: "%s | Islam Hadaya (إسلام هدايا)",
  },
  description:
    "Islam Hadaya (إسلام هدايا) - Full-Stack Software Developer & Backend Engineer specialized in SaaS platforms, REST APIs, and workflow automation using Next.js, NestJS, Laravel, Node.js, and PostgreSQL. تطوير مواقع ومنصات ويب متكاملة.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  keywords: [
    // Identity (EN & AR - No duplicates)
    "Islam Hadaya",
    "إسلام هدايا",
    "اسلام هدايا",
    "Eslam Hadaya",

    // Job Titles (EN & AR)
    "Full-Stack Developer",
    "Backend Engineer",
    "Software Engineer",
    "Freelance Web Developer",
    "مطور ويب",
    "مطور فل ستاك",
    "مبرمج مواقع",
    "مهندس برمجيات",
    "مبرمج باك اند",

    // Tech Stack
    "Next.js Developer",
    "NestJS Developer",
    "Laravel Developer",
    "Node.js Developer",
    "React Developer",
    "PostgreSQL",
    "Prisma ORM",
    "TypeScript",
    "n8n Automation",

    // Services & Location
    "SaaS Development",
    "API Development",
    "E-commerce Development",
    "Web Security Auditing",
    "تطوير متاجر إلكترونية",
    "برمجة تطبيقات ويب",
    "Syrian Developer",
    "مبرمج في سوريا",
    "مبرمج في حلب",
  ],

  authors: [{ name: "Islam Hadaya", url: "https://github.com/eslam-cmd" }],
  creator: "Islam Hadaya",
  publisher: "Islam Hadaya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Islam Hadaya (إسلام هدايا) | Full-Stack Developer (Next.js, NestJS, Laravel)",
    description:
      "Full-Stack Software Engineer building scalable SaaS platforms, secure APIs, and modern web apps using Next.js, NestJS, Laravel, and PostgreSQL.",
    url: siteUrl,
    siteName: "Islam Hadaya | إسلام هدايا",
    locale: "en_US",
    alternateLocale: ["ar_SY"],
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Islam Hadaya - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Hadaya (إسلام هدايا) | Full-Stack Web Developer",
    description:
      "Building SaaS platforms, REST APIs, and modern web applications with Next.js, NestJS, Laravel, and PostgreSQL.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Islam Hadaya",
      alternateName: ["إسلام هدايا", "اسلام هدايا", "Eslam Hadaya"],
      givenName: "Islam",
      familyName: "Hadaya",
      jobTitle: "Full-Stack Web Developer & Backend Engineer",
      description:
        "Full-Stack Software Developer specialized in building SaaS platforms, REST APIs, and web applications using Next.js, NestJS, Laravel, Node.js, and PostgreSQL.",
      url: siteUrl,
      sameAs: [
        "https://github.com/eslam-cmd",
        "https://www.linkedin.com/in/eslam-hd-60a056357",
        "https://www.facebook.com/islam.hadaya.2025",
        "https://x.com/eslam_hadaya",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aleppo",
        addressCountry: "SY",
      },
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js",
        "NestJS",
        "Laravel",
        "React",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "BullMQ",
        "TypeScript",
        "Tailwind CSS",
        "n8n Workflow Automation",
        "Web Security Auditing",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Islam Hadaya - Web Development Services",
      alternateName: "إسلام هدايا لتطوير الويب والبرمجيات",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/og-image.jpg`,
      founder: { "@id": `${siteUrl}/#person` },
      description:
        "Comprehensive Full-Stack web development, SaaS architecture, and backend API engineering using Next.js, NestJS, Laravel, and PostgreSQL.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aleppo",
        addressCountry: "SY",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hdayaaslam34@gmail.com",
        contactType: "customer support",
        availableLanguage: ["Arabic", "English"],
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          <VisitorTracker />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
