import { Poppins } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

const poppins = Poppins({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Save The Date",
  description: "ECard Customization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable}`}>{children}</body>
    </html>
  );
}
