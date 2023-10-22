import NavHeader from "@/components/navHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 p-6 mb-4">
      <NavHeader variant="back" />
      {children}
    </div>
  );
}
