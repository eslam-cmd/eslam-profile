"use client";

import React from "react";
import { projects } from "../../../../data/projectWebData";
import { projectAppData } from "../../../../data/projectAppData";
import ProjectSection from "@/components/projects/projectSection";

export default function ContactScreen() {
  return (
    <>
      <ProjectSection projects={projects} />
    </>
  );
}
