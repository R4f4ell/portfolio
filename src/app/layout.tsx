import type { Metadata } from "next";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio pessoal",
  icons: {
    icon: "/iconFavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
