import PeopleScience from "@/src/features/home/sections/PeopleScience/PeopleScience";
import Navbar from "@/src/components/layout/Navbar/Navbar";

export const metadata = {
  title: "People Science: Elevate Performance Culture | VibeOS",
  description: "Learn how VibeOS's approach to people science, organizational psychology, and advanced research helps you unlock organizational performance at scale.",
};

export default function PeopleSciencePage() {
  return (
    <>
      <Navbar />
      <PeopleScience />
    </>
  );
}
