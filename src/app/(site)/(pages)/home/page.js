"use client";

import React from "react";
import Header from "@/components/Others/header";
import Footer from "@/components/Others/footer";
import MainSection from "@/components/mainsection/mainsection";
import ToolsSection from "@/components/toolsSection/toolsSection";
import SkillsRatingSection from "@/components/serversSection/serverssection";
import AboutPage from "@/components/aboutme/aboutMe";

export default function HomePage({ toggleTheme, darkMode }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <MainSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <ToolsSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <SkillsRatingSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <AboutPage toggleTheme={toggleTheme} darkMode={darkMode} />
      <Footer />
    </>
  );
}
