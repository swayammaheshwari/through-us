import "./globals.css";
import { Inter } from "next/font/google";
import "@/public/assets/css/bootstrap.min.css";
import "@/public/assets/css/mediumish.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "through-us",
  description: "swayam maheshwari",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.ico" />
        <script src="/assets/js/jquery.min.js" defer></script>
        <script src="/assets/js/tether.js" defer></script>
        <script src="/assets/js/bootstrap.min.js" defer></script>
        <script src="/assets/js/ie10-viewport-bug-workaround.js" defer></script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
