import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "A mini Trello-like Kanban board built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
