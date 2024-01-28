import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KODAVA SAMAJA BANGALORE",
  description: " 19th inter-sanga hockey tournament 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="bangalore,  hockey, kodava, tournament"
        />
        <meta name="author" content="chinnappa" />
        <link rel="canonical" href="https://hifliersvbadaga.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="f2_PbllY4p_DXBeu1Y6WDOZIhxgohp3YWjvtS7kdQv0"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
