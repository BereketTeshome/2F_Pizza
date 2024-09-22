import Fasting from "./components/Fasting";
import Featured from "./components/Featured";
import Hero from "./components/Hero";
import Popular from "./components/Popular";
import TopRestaurants from "./components/TopRestaurants";

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <TopRestaurants />
      <Popular />
      <Fasting />
    </div>
  );
}
