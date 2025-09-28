"use client";

import React from "react";
import Header from "../../../../components/Ultimits/header";
import Footer from "../../../../components/Ultimits/footer";
import MainSection from "../../../../components/mainsection/mainsection";
import ToolsSection from "../../../../components/toolsSection/toolsSection";
import SkillsRatingSection from "../../../../components/serversSection/serverssection";
import ExpandSdservices from "../../../../components/expandsdservices/expandsdservices";
import ContactSection from "../../../../components/contactsection/contactsection";
import FeedbackForm from "@/components/feedback/feedbackForm";
import FeedbackList from "@/components/feedback/feedbackList";

export default function HomePage({ toggleTheme, darkMode }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <MainSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <ToolsSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <SkillsRatingSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <ExpandSdservices toggleTheme={toggleTheme} darkMode={darkMode} />
      <ContactSection toggleTheme={toggleTheme} darkMode={darkMode} />
      <FeedbackForm toggleTheme={toggleTheme} darkMode={darkMode}/>
      <FeedbackList toggleTheme={toggleTheme} darkMode={darkMode}/>
      <Footer />
    </>
  );
}
