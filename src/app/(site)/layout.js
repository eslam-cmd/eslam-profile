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
  title: {
    default: "إسلام هدايا | مطور ويب فريلانسر - Next.js, Node.js, PostgreSQL",
    template: "%s | إسلام هدايا - مطور ويب",
  },
  description:
    "إسلام هدايا، مطور ويب متخصص في بناء منصات SaaS وتطبيقات الويب باستخدام Next.js و Node.js و PostgreSQL. أقدم خدمات تطوير ويب متكاملة للشركات والأفراد في حلب، سوريا والعالم العربي.",
  keywords: [
    // الأسم والهوية
    "إسلام هدايا",
    "Islam Hadaya",
    "اسلام هدايا",
    "Islam Profile",
    "اسلام بروفايل",
    "Islam Canada",
    "اسلام كندا",
    "Islam Syria",
    "اسلام سوريا",
    "Islam Aleppo",
    "اسلام حلب",

    // المسمى الوظيفي
    "مطور ويب",
    "Web Developer",
    "Full-Stack Developer",
    "مطور Full-Stack",
    "Frontend Developer",
    "مطور واجهات",
    "Backend Developer",
    "مطور خلفيات",

    // التقنيات
    "Next.js Developer",
    "مطور Next.js",
    "Node.js Developer",
    "مطور Node.js",
    "React Developer",
    "مطور React",
    "PostgreSQL Developer",
    "TypeScript",
    "JavaScript",

    // الخدمات
    "خدمات برمجة",
    "Programming Services",
    "تطوير تطبيقات",
    "App Development",
    "بناء منصات",
    "Platform Development",
    "SaaS Development",
    "تطوير SaaS",
    "Web Development Services",
    "خدمات تطوير ويب",
    "Freelance Developer",
    "مطور فريلانسر",
    "Freelancer Syria",
    "فريلانسر سوريا",

    // الموقع
    "حلب",
    "Aleppo",
    "سوريا",
    "Syria",
    "Syrian Developer",
    "مطور سوري",
    "Arab Developer",
    "مطور عربي",

    // مجالات أخرى
    "برمجة",
    "Coding",
    "Web Design",
    "تصميم ويب",
    "UI/UX",
    "API Development",
    "تطوير APIs",
    "Database Design",
    "تصميم قواعد بيانات",
    "E-commerce Development",
    "تطوير متاجر إلكترونية",

    // كلمات عامة
    "برمجة",
    "تقنية",
    "Technology",
    "Software Engineer",
    "مهندس برمجيات",
    "Code",
    "كود",
    "Developer Portfolio",
    "معرض أعمال مطور",
  ],
  authors: [{ name: "Islam Hadaya", url: "https://github.com/eslam-cmd" }],
  creator: "Islam Hadaya",
  publisher: "Islam Hadaya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "إسلام هدايا | مطور ويب فريلانسر - Next.js, Node.js, PostgreSQL",
    description:
      "إسلام هدايا، مطور ويب متخصص في بناء منصات SaaS وتطبيقات الويب. أقدم خدمات تطوير ويب متكاملة في حلب، سوريا والعالم العربي.",
    url: "https://your-domain.com",
    siteName: "إسلام هدايا | مطور ويب",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "إسلام هدايا - مطور ويب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إسلام هدايا | مطور ويب فريلانسر",
    description:
      "إسلام هدايا، مطور ويب متخصص في بناء منصات SaaS وتطبيقات الويب",
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
    <html lang="ar" dir="rtl">
      <head>
        {/* إضافة الـ Meta Tags الإضافية */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A1F44" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* رابط الـ Canonical */}
        <link rel="canonical" href="https://your-domain.com" />

        {/* RSS Feed (اختياري) */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="إسلام هدايا"
          href="/feed.xml"
        />

        {/* Open Graph إضافية */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="إسلام هدايا | مطور ويب" />
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
                "مطور ويب متخصص في بناء منصات SaaS وتطبيقات الويب باستخدام Next.js و Node.js و PostgreSQL",
              url: "https://your-domain.com",
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
                description: "خدمات تطوير ويب متكاملة",
              },
            }),
          }}
        />

        {/* Schema Markup للـ Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "إسلام هدايا - مطور ويب",
              url: "https://your-domain.com",
              logo: "https://your-domain.com/logo.png",
              description:
                "خدمات تطوير ويب متكاملة باستخدام Next.js و Node.js و PostgreSQL",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>
          <VisitorTracker />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
