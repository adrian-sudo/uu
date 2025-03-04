import { Logo } from "@/components/Logo";
import React from "react";

export default function layoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <Logo />
      <h1 className="text-4xl my-5">Casa Luker </h1>
      <p className="text-2xl my-3">Bienvenido al portal de Casa Luker</p>
      {children}
    </div>
  );
}
