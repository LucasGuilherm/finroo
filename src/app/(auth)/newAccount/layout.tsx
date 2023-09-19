"use client";

import { NewFormProvider } from "./NewContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 p-6 h-screen">
      <NewFormProvider>{children}</NewFormProvider>
    </div>
  );
}
