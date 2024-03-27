export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`bg-yellow-300 h-screen`}>{children}</div>;
}
