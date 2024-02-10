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
    label: "よくあるご質問",
    href: "/faq",
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
