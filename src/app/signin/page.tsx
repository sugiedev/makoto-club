"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "~/firebase/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (!email) return;
    if (!password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="">
      <section className="bg-gray-50">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="xl:p-0s w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault(); // デフォルトのフォーム送信を阻止
                  await signIn();
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    パスワード
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="/signup"
                    className="font-medium text-gray-600 hover:underline"
                  >
                    新規会員登録はこちら
                  </a>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:underline"
                  >
                    パスワードを忘れましたか？
                  </a>
                </div>
                <button
                  type="submit"
                  className=" bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg border border-black px-5 py-2.5 text-center text-sm font-medium text-gray-600 focus:outline-none focus:ring-4"
                >
                  ログインする
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
