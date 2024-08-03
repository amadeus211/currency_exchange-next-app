import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Currency exchange",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/currency.png" type="image/png" />
      </head>
      <body className="font-extralight">{children}</body>
    </html>
  );
}
