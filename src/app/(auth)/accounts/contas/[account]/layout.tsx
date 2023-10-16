export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col items-center gap-6">{children}</div>;
}
