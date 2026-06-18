import VibeIndexMatrix from "@/src/features/home/sections/VibeIndexMatrix/VibeIndexMatrix";
import Navbar from "@/src/components/layout/Navbar/Navbar";

export const metadata = {
  title: "Vibe Index Matrix | VibeOS",
  description: "Diagnose organizational culture and align performance confidence with workplace engagement using the Vibe Index Matrix.",
};

export default function VibeIndexMatrixPage() {
  return (
    <>
      <Navbar />
      <VibeIndexMatrix />
    </>
  );
}
