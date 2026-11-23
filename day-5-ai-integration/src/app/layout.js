import "./globals.css";

export const metadata = {
  title: "CampusConnect | Projects",
  description:
    "Manage campus projects with a Next.js dashboard connected to the Express API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
