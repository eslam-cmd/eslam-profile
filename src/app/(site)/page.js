import { Suspense } from "react";
import MainSectionContent from "./(pages)/home/MainSectionContent";
import MainSectionClient from "./(pages)/home/MainSectionClient";
import HomeClient from "./HomeClient";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient>
          <MainSectionContent />
          <MainSectionClient />
        </HomeClient>
      </Suspense>
    </>
  );
}
