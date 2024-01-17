"use client";

import { useAuth } from "~/provider/AuthProvider";
import { SearchArea } from "./components/SearchArea";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-1 font-bold">匿名店舗アンケートから集めた</p>
        <p className="font-bold">リアルな店舗情報まとめ</p>
      </div>
      <Image
        className="w-full pb-2 "
        src="/test.png"
        alt={""}
        width={200}
        height={200}
      />
      <SearchArea />
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>

        <Link href="/anke">
          <p className="mb-1 pt-3 font-bold underline">
            匿名店舗アンケートの記入であまぺい最大1000円分をプレゼント！
          </p>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="pt-5 text-xl font-bold">👼新着匿名店舗アンケート👿</p>
      </div>
      <div className="flex space-x-4 overflow-x-auto p-4">
        <div className="w-64 flex-none rounded-lg bg-yellow-100 p-4">
          <p>👼優良店舗情報👼</p>
          <p>店舗:富山🚗バイキング</p>
          <p>時期:2023年12/24-12/31</p>
          <p>稼ぎ:オーラス8日間　アベ9</p>
          <p>年齢：25</p>
          <p>スペック：スペ80</p>
          <p> 【内容】</p>
          <p>
            スタッフさんも優しくて、寮も普通のレオパレス。
            本指名呼べれば稼げます。 稼働がいいです。
          </p>
        </div>
        <div className="w-64 flex-none rounded-lg bg-yellow-100 p-4">
          <p>👼優良店舗情報👼</p>
          <p>店舗:富山🚗バイキング</p>
          <p>時期:2023年12/24-12/31</p>
          <p>稼ぎ:オーラス8日間　アベ9</p>
          <p>年齢：25</p>
          <p>スペック：スペ80</p>
          <p> 【内容】</p>
          <p>
            スタッフさんも優しくて、寮も普通のレオパレス。
            本指名呼べれば稼げます。 稼働がいいです。
          </p>
        </div>
        <div className="w-64 flex-none rounded-lg bg-yellow-100 p-4">
          <p>👼優良店舗情報👼</p>
          <p>店舗:富山🚗バイキング</p>
          <p>時期:2023年12/24-12/31</p>
          <p>稼ぎ:オーラス8日間　アベ9</p>
          <p>年齢：25</p>
          <p>スペック：スペ80</p>
          <p> 【内容】</p>
          <p>
            スタッフさんも優しくて、寮も普通のレオパレス。
            本指名呼べれば稼げます。 稼働がいいです。
          </p>
        </div>
        <div className="w-64 flex-none rounded-lg bg-yellow-100 p-4">
          <p>👼優良店舗情報👼</p>
          <p>店舗:富山🚗バイキング</p>
          <p>時期:2023年12/24-12/31</p>
          <p>稼ぎ:オーラス8日間　アベ9</p>
          <p>年齢：25</p>
          <p>スペック：スペ80</p>
          <p> 【内容】</p>
          <p>
            スタッフさんも優しくて、寮も普通のレオパレス。
            本指名呼べれば稼げます。 稼働がいいです。
          </p>
        </div>
      </div>
    </div>
  );
}
