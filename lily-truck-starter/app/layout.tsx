import "./../styles/globals.css";
import Nav from "../components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lily Truck • Commande en ligne",
  description: "Le nec plus ultra du burger – commande en ligne, suivi en temps réel.",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/icon-192.png" }],
  themeColor: "#FFD400"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main className="mx-auto max-w-screen-sm px-4 py-4">{children}</main>
      </body>
    </html>
  );
}
