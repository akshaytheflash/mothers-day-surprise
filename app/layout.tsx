import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mother's Day Surprise 🌸 | Made with Love",
  description:
    "A magical, personalized Mother's Day surprise — pop the balloons, read the letter, feel the love. Created with love for the most special woman in the world.",
  keywords: ["Mother's Day", "surprise", "gift", "love", "personalized"],
  openGraph: {
    title: "Mother's Day Surprise 🌸",
    description: "A magical personalized surprise made just for you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#fce4ec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
