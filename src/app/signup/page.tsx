"use client";

import { useState } from "react";
import { auth } from "~/firebase/client";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  // sendSignInLinkToEmail,
} from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (!email) return;
    if (!password) return;

    try {
      alert("会員登録をします。" + email + ":" + password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        alert("メールアドレス登録が済んでいません。");
        // await sendSignInLinkToEmail(auth, email, {
        //   url: "https://raichi-qzin.com",
        //   handleCodeInApp: true,
        // });
        await sendEmailVerification(user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 "
        >
          会員登録ページ
        </a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={async (e) => {
                e.preventDefault(); // デフォルトのフォーム送信を阻止
                await signUp();
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
                  href="#"
                  className="font-medium text-gray-600 hover:underline"
                >
                  ログインはこちら
                </a>
              </div>
              <button
                type="submit"
                className=" bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg border border-black px-5 py-2.5 text-center text-sm font-medium text-gray-600 focus:outline-none focus:ring-4"
              >
                会員登録をする
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
