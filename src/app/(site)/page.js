// src/app/page.js
import HomeClient from "./HomeClient";
import MainSection from "../../components/mainsection/mainsection";

export default function Home() {
  return (
    <HomeClient>
      <MainSection />
    </HomeClient>
  );
}
