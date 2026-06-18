import SciBenchmarks from "@/src/features/home/sections/SciBenchmarks/SciBenchmarks";
import Navbar from "@/src/components/layout/Navbar/Navbar";

export const metadata = {
  title: "Benchmark Insights: Compare Team Performance | VibeOS",
  description: "Explore data-driven insights and global benchmarks from millions of employee responses. Learn how the world's best companies build high-performing cultures.",
};

export default function BenchmarksPage() {
  return (
    <>
      <Navbar />
      <SciBenchmarks />
    </>
  );
}
