// src/app/sitemap.js
export default function sitemap() {
  const baseUrl = "https://eslam-profile.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

  ];
}
