import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "LinkPulse",
  description: "Smart URL Shortener with Analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
