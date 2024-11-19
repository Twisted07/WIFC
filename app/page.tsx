"use client";

import Image from "next/image";
import SuggestionPage from "./suggestions/page";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd"

export default function Home() {
  useEffect(function(){redirect('/suggestions')}, [])
  return (
    <div className="h-[100vh]">
      <Spin />
    </div>
  );

}
