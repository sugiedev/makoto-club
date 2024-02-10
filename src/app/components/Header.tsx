"use client";

import Link from "next/link";
import { useToggle } from "react-use";
import { Logo } from "./Logo";
// import { useAuth } from "~/provider/AuthProvider";
// import { signOut } from "firebase/auth";
// import { auth } from "~/firebase/client";
// import { useRouter } from "next/navigation";

type Props = {
  menuList: {
    label: string;
    href: string;
  }[];
};

export const Header = (props: Props) => {
  // const { user } = useAuth();
  const [isOpen, changeOpen] = useToggle(false);
  // const router = useRouter();

  return (
    <header className="flex w-full max-w-md flex-col bg-green-400 px-5 py-3 text-center">
      <div className="flex items-center justify-between">
        <Logo />
        <nav
          className={
            isOpen
              ? "fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen flex-col backdrop-blur-lg transition duration-0 ease-in-out"
              : "fixed right-[-100%]"
          }
        >
          <ul
            className={
              isOpen
                ? "flex h-screen flex-col items-center justify-center gap-6 text-xl"
                : "block"
            }
          >
            {props.menuList.map((v) => (
              <li key={v.label}>
                <Link
                  onClick={changeOpen}
                  href={v.href}
                  className="font-boldtext-gray-700 text-xl"
                >
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex h-full items-center">
          {/* {user ? (
            <button
              type="button"
              className=" flex items-center rounded-lg border border-gray-200 bg-white px-1 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
              onClick={() => signOut(auth)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              ログアウト
            </button>
          ) : (
            <button
              type="button"
              className=" flex items-center rounded-lg border border-gray-200 bg-white px-1 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
              onClick={() => router.push("/signin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              ログイン
            </button>
          )} */}
          <div className="mx-2 flex h-full items-center">
            <button className="z-50 space-y-2" onClick={changeOpen}>
              <span
                className={
                  isOpen
                    ? "block h-0.5 w-8 translate-y-2.5 rotate-45 bg-white duration-300"
                    : "block h-0.5 w-8 bg-white duration-300"
                }
              />
              <span
                className={
                  isOpen
                    ? "block opacity-0 duration-300"
                    : "block h-0.5 w-8 bg-white duration-300"
                }
              />
              <span
                className={
                  isOpen
                    ? "block h-0.5 w-8 -rotate-45 bg-white duration-300"
                    : "block h-0.5 w-8 bg-white duration-300"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
