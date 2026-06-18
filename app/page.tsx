import Hero from "../src/features/home/sections/Hero/Hero";
import Solutions from "../src/features/home/sections/Solutions/Solutions";
import Benefit from "../src/features/home/sections/Benefit/Benefit";
import Features from "../src/features/home/sections/Features/Features";
import Navbar from "../src/components/layout/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Solutions />
      <Features />
      <Benefit />
    </>
  );
}
