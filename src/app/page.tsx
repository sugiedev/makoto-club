"use client";

import { SearchArea } from "./components/SearchArea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { type Anke, ShopDataContext } from "~/provider/ShopProvider";

export default function Home() {
  const { shopData } = useContext(ShopDataContext);

  const newestAnkes = shopData
    .flatMap((shop) => shop.anke) // すべてのアンケートを一つの配列にフラット化
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ) // "createdAt"でソート
    .slice(0, 5); // 上位5つを取得

  const router = useRouter();
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

        <button
          onClick={() =>
            router.push(
              "https://docs.google.com/forms/d/e/1FAIpQLSdBpsJP8jM5bQ0ONSb0vUgVNWW0rg_uXJvfHTPlIyPZv2dOBw/viewform?usp=sharing",
            )
          }
        >
          <p className="mb-1 pt-3 font-bold underline">
            匿名店舗アンケートの記入であまぺい最大1000円分をプレゼント！
          </p>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="pt-5 text-xl font-bold">👼新着匿名店舗アンケート👿</p>
      </div>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {newestAnkes.map((v: Anke) => (
          <div
            key={v.ankeId}
            className="w-64 flex-none cursor-pointer rounded-lg bg-yellow-100 p-4"
            onClick={() => router.push(`/shop/${v.shopId}`)}
          >
            <p className="text-xl">👼匿名アンケート👿</p>
            <p>評価:{v.totalRating}</p>
            <hr />
            <p>店舗:{v.shopName}</p>
            <p>{v.prefecture}</p>
            <p>業種:{v.serviceType}</p>

            <p>時期:{v.workingDate}</p>
            <p>稼ぎ:{v.average}</p>
            <p>年齢：{v.workingAge}</p>
            <p>スペック：{v.workingSpec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
