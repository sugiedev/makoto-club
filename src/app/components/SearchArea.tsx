"use client";

import { useContext } from "react";
import { ShopDataContext } from "~/provider/ShopProvider";
import { MultipleSelect } from "./Select";

export const SearchArea = (): JSX.Element => {
  const { shopData } = useContext(ShopDataContext);

  const serviceTypeOptions = shopData.map((v) => {
    return { value: v.serviceType, label: v.serviceType };
  });

  const prefectureOptions = shopData.map((v) => {
    return { value: v.prefecture, label: v.prefecture };
  });

  return (
    <div className="space-y-3 rounded-md bg-white p-3">
      <MultipleSelect options={serviceTypeOptions} placeholder="業種" />

      <MultipleSelect options={prefectureOptions} placeholder="エリア" />
      <button className="label-white w-full transform rounded bg-blue-500 px-4 py-4 text-white transition-transform duration-200 hover:scale-95 hover:bg-blue-400">
        店舗を探す
      </button>

      <div className="flex flex-col items-center justify-center text-gray-600">
        <p>口コミを見たい地域・業態を選択してください</p>
      </div>
    </div>
  );
};
