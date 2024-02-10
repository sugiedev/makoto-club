"use client";

import { useContext, useEffect, useState } from "react";
import { type Anke, type Shop, ShopDataContext } from "~/provider/ShopProvider";
import { LineRating } from "../Rating";

export default function Page({ params }: { params: { id: string } }) {
  const { getShopById } = useContext(ShopDataContext);
  const [data, setData] = useState<Shop>();

  useEffect(() => {
    const fetchData = async () => {
      const result = getShopById(params.id);
      setData(result);
    };

    void fetchData();
  }, [params.id, getShopById]);

  const calculateRating = (key: keyof Anke): number => {
    if (!data?.anke || data.anke.length === 0) return 0;
    const totalRating = data.anke.reduce(
      (acc, curr) => acc + Number(curr[key]),
      0,
    );
    const averageRating = totalRating / data.anke.length;
    return parseFloat(averageRating.toFixed(1));
  };

  return (
    <div>
      <p className="text-2xl font-bold">{data?.shopName} - 店舗評価</p>
      <hr className="my-2" />
      <LineRating
        kuchikomiCount={data?.anke.length ?? 0}
        totalCustomerQualityRating={calculateRating("ratingCustomerQuality")}
        totalEnvironmentQualityRating={calculateRating(
          "ratingEnvironmentQuality",
        )}
        totalGuaranteeRating={calculateRating("ratingGuarantee")}
        totalStaffQualityRating={calculateRating("ratingStaffQuality")}
        totalTurnoverRateRating={calculateRating("ratingTurnoverRate")}
        totalRating={calculateRating("totalRating")}
      />
      <div className="m-2 mt-5 p-2">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="border border-gray-500 px-4 py-2 font-bold">
                店舗名
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {data?.shopName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2 font-bold">
                都道府県
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {data?.prefecture}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2 font-bold">
                業種
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {data?.serviceType}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="m-2" />
      {data?.anke.map((v) => (
        <div key={v.ankeId} className="m-4 flex justify-center">
          <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-1 shadow hover:bg-gray-100">
            <p className="font-normal text-gray-700">
              投稿日時: {v.writingDateStr}
            </p>
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              評価: {v.totalRating}
            </h5>
            <hr />
            <p className="font-normal text-gray-700">バック率: {v.guarantee}</p>
            <hr />
            <p className="font-normal text-gray-700">
              回転率: {v.turnoverRate}
            </p>
            <hr />
            <p className="font-normal text-gray-700">
              客層: {v.customerQualityComment}
            </p>
            <hr />
            <p className="font-normal text-gray-700">
              スタッフ対応: {v.staffQualityComment}
            </p>
            <hr />
            <p className="font-normal text-gray-700">
              店舗環境: {v.environmentQualityComment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
