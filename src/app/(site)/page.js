import { Suspense } from "react";
import HomeClient from "./HomeClient";
import MainSection from "../../components/mainsection/mainsection";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient>
          <MainSection />
        </HomeClient>
      </Suspense>
    </>
  );
}
