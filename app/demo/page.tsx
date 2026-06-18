"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtoStore } from "@/src/store/useProtoStore";

export default function DemoPage() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  const router = useRouter();

  useEffect(() => {
    setDemoModalOpen(true);
    router.replace("/");
  }, [setDemoModalOpen, router]);

  return null;
}
