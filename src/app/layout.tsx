import "~/styles/globals.css";
import { AuthProvider } from "~/provider/AuthProvider";
import { Header } from "./components/Header";
import { ShopDataProvider } from "~/provider/ShopProvider";

const menu: { label: string; href: string }[] = [
  {
    label: "TOP",
    href: "/",
  },
  {
    label: "アンケートを書く",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdBpsJP8jM5bQ0ONSb0vUgVNWW0rg_uXJvfHTPlIyPZv2dOBw/viewform?usp=sharing",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <AuthProvider>
        <ShopDataProvider>
          <body
            className={`flex flex-col items-center justify-center bg-green-100`}
          >
            <Header menuList={[...menu]} />
            <main className="w-full max-w-md">{children}</main>
          </body>
        </ShopDataProvider>
      </AuthProvider>
    </html>
  );
}
