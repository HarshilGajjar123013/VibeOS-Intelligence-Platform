import ROI from "@/src/features/home/sections/ROI/ROI";
import Navbar from "@/src/components/layout/Navbar/Navbar";

export const metadata = {
  title: "Employee Experience ROI Calculator | VibeOS",
  description: "Quantify the business value of investing in employee engagement, retention, manager effectiveness, and people operations with our interactive ROI simulator.",
};

export default function ROICalculatorPage() {
  return (
    <>
      <Navbar />
      <ROI />
    </>
  );
}
