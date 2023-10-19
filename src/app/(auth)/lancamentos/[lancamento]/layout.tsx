import NavHeader from "@/components/navHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen gap-4 p-6">
      <NavHeader variant="back" />
      {children}
    </div>
  );
}
