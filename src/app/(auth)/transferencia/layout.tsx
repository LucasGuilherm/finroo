import NavHeader from "@/components/navHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 p-6 h-screen">
      <NavHeader variant="back" />
      {children}
    </div>
  );
}
