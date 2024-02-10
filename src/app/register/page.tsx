"use client";
import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ShopDataContext } from "~/provider/ShopProvider";

type Inputs = {
  writingDateStr: string;
  // writingDate: Date;
  selectedShopId: string;
  newShopName?: string;
  newPrefecture?: string;
  newServiceType?: string;
  workingDate: string;
  workingAge: string;
  workingSpec: string;
  workingStyle: string;
  waitTime: string;
  guarantee: string;
  ratingGuarantee: "1" | "2" | "3" | "4" | "5";
  turnoverRate: string;
  ratingTurnoverRate: "1" | "2" | "3" | "4" | "5";
  average: string;
  customerQuality: string;
  ratingCustomerQuality: "1" | "2" | "3" | "4" | "5";
  customerQualityComment: string;
  staffQuality: string;
  staffQualityComment: string;
  ratingStaffQuality: "1" | "2" | "3" | "4" | "5";
  environmentQuality: string;
  ratingEnvironmentQuality: "1" | "2" | "3" | "4" | "5";
  environmentQualityComment: string;
  totalRating: number;
};

// function convertToDate(dateString: string): Date {
//   const [datePart, timePart] = dateString.split(" ");
//   if (!(datePart && timePart)) {
//     return new Date();
//   }

//   const [year, month, day] = datePart.split("/");
//   const [hour, minute, second] = timePart.split(":");

//   if (!year || !month || !day || !hour || !minute || !second) {
//     return new Date();
//   }

//   // 年月日と時間を指定してDateオブジェクトを作成
//   const date = new Date(
//     parseInt(year),
//     parseInt(month) - 1,
//     parseInt(day),
//     parseInt(hour),
//     parseInt(minute),
//     parseInt(second),
//   );

//   if (isNaN(date.getTime())) {
//     console.error("Invalid date string:", dateString);
//     return new Date();
//   }

//   return date;
// }

export default function Page() {
  const { shopData } = useContext(ShopDataContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  function calculateAverage(numbers: number[]) {
    if (numbers.length === 0) {
      return 0;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      data.totalRating = calculateAverage([
        parseInt(data.ratingGuarantee),
        parseInt(data.ratingCustomerQuality),
        parseInt(data.ratingEnvironmentQuality),
        parseInt(data.ratingStaffQuality),
        parseInt(data.ratingTurnoverRate),
      ]);
      console.log(data);

      // data.writingDate = convertToDate(data.writingDateStr);
      // console.log(data.writingDate);

      const response = await fetch("/api/registerAnke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Data sent successfully");
      alert("登録が完了しました。");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      {shopData ? (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-6 w-full max-w-sm"
          >
            <div>
              <div className="mb-4">
                <label
                  htmlFor="writingDateStr"
                  className="block text-sm font-medium text-gray-900"
                >
                  書き込み時間
                </label>
                <input
                  id="writingDateStr"
                  {...register("writingDateStr", { required: true })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.writingDateStr && (
                  <span className="text-sm text-red-500">必須項目です</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="selectedShopId"
                className="block text-sm font-medium text-gray-900"
              >
                店舗を選択
              </label>
              <select
                id="selectedShopId"
                {...register("selectedShopId", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">店舗を選ぶ</option>
                <option value="register">新規登録</option>
                {shopData?.map(({ shopName, id }, index) => (
                  <option key={index} value={id}>
                    {shopName}
                  </option>
                ))}
              </select>
              {errors.selectedShopId && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            {watch("selectedShopId") === "register" && (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="newShopName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    店舗名
                  </label>
                  <input
                    id="newShopName"
                    {...register("newShopName", { required: true })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.newShopName && (
                    <span className="text-sm text-red-500">
                      新規登録用の店舗名を入力してください。
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="newPrefecture"
                    className="block text-sm font-medium text-gray-900"
                  >
                    都道府県
                  </label>
                  <select
                    id="newPrefecture"
                    {...register("newPrefecture", { required: true })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">都道府県を選択</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                  </select>
                  {errors.newPrefecture && (
                    <span className="text-sm text-red-500">
                      都道府県を選択してください。
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="newServiceType"
                    className="block text-sm font-medium text-gray-900"
                  >
                    業種
                  </label>
                  <select
                    id="newServiceType"
                    {...register("newServiceType", { required: true })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">業種を選択</option>
                    <option value="混合ソープ">混合ソープ</option>
                    <option value="S着ソープ">S着ソープ</option>
                    <option value="NSソープ">NSソープ</option>
                    <option value="デリヘル">デリヘル</option>
                    <option value="ホテヘル">ホテヘル</option>
                    <option value="箱ヘル">箱ヘル</option>
                    <option value="メンズエステ(ヌキあり)">
                      メンズエステ(ヌキあり)
                    </option>
                    <option value="メンズエステ(ヌキなし)">
                      メンズエステ(ヌキなし)
                    </option>
                    <option value="セクキャバ">セクキャバ</option>
                    <option value="いちゃキャバ">いちゃキャバ</option>
                  </select>
                  {errors.newServiceType && (
                    <span className="text-sm text-red-500">
                      業種を選択してください。
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="workingDate"
                className="block text-sm font-medium text-gray-900"
              >
                時期
              </label>
              <input
                id="workingDate"
                {...register("workingDate", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.workingDate && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="workingAge"
                className="block text-sm font-medium text-gray-900"
              >
                当時年齢
              </label>
              <input
                id="workingAge"
                {...register("workingAge", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.workingAge && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="workingSpec"
                className="block text-sm font-medium text-gray-900"
              >
                当時スペック
              </label>
              <input
                id="workingSpec"
                {...register("workingSpec", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.workingSpec && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="workingStyle"
                className="block text-sm font-medium text-gray-900"
              >
                勤務スタイル
              </label>
              <input
                id="workingStyle"
                {...register("workingStyle", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.workingStyle && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="waitTime"
                className="block text-sm font-medium text-gray-900"
              >
                待機時間
              </label>
              <input
                id="waitTime"
                {...register("waitTime", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.waitTime && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="guarantee"
                className="block text-sm font-medium text-gray-900"
              >
                バック率・条件
              </label>
              <input
                id="guarantee"
                {...register("guarantee", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.guarantee && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="ratingGuarantee"
                className="block text-sm font-medium text-gray-900"
              >
                バック率の点数
              </label>
              <select
                id="ratingGuarantee"
                {...register("ratingGuarantee", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">点数</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.ratingGuarantee && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="turnoverRate"
                className="block text-sm font-medium text-gray-900"
              >
                待機時間・回転率
              </label>
              <input
                id="turnoverRate"
                {...register("turnoverRate", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.turnoverRate && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="ratingTurnoverRate"
                className="block text-sm font-medium text-gray-900"
              >
                回転率の点数
              </label>
              <select
                id="ratingTurnoverRate"
                {...register("ratingTurnoverRate", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">点数</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.ratingTurnoverRate && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="average"
                className="block text-sm font-medium text-gray-900"
              >
                １日の平均稼ぎ・アベレージ
              </label>
              <input
                id="average"
                {...register("average", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.average && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="customerQuality"
                className="block text-sm font-medium text-gray-900"
              >
                客層はいかがでしたか？
              </label>
              <input
                id="customerQuality"
                {...register("customerQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.customerQuality && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="ratingCustomerQuality"
                className="block text-sm font-medium text-gray-900"
              >
                客層の点数
              </label>
              <select
                id="ratingCustomerQuality"
                {...register("ratingCustomerQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">点数</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.ratingCustomerQuality && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="customerQualityComment"
                className="block text-sm font-medium text-gray-900"
              >
                客層についてお聞かせください
              </label>
              <input
                id="customerQualityComment"
                {...register("customerQualityComment", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.customerQualityComment && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="staffQuality"
                className="block text-sm font-medium text-gray-900"
              >
                スタッフ対応はいかがでしたか？
              </label>
              <input
                id="staffQuality"
                {...register("staffQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.staffQuality && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="ratingStaffQuality"
                className="block text-sm font-medium text-gray-900"
              >
                スタッフ対応の点数
              </label>
              <select
                id="ratingStaffQuality"
                {...register("ratingStaffQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">点数</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.ratingStaffQuality && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="staffQualityComment"
                className="block text-sm font-medium text-gray-900"
              >
                スタッフ対応についてお聞かせください
              </label>
              <input
                id="staffQualityComment"
                {...register("staffQualityComment", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.staffQualityComment && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="environmentQuality"
                className="block text-sm font-medium text-gray-900"
              >
                店舗の環境はいかがでしたか？
              </label>
              <input
                id="environmentQuality"
                {...register("environmentQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.environmentQuality && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="ratingEnvironmentQuality"
                className="block text-sm font-medium text-gray-900"
              >
                環境の点数
              </label>
              <select
                id="ratingEnvironmentQuality"
                {...register("ratingEnvironmentQuality", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">点数</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.ratingEnvironmentQuality && (
                <span className="text-sm text-red-500">必須の項目です。</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="environmentQualityComment"
                className="block text-sm font-medium text-gray-900"
              >
                店舗環境についてお聞かせください
              </label>
              <input
                id="environmentQualityComment"
                {...register("environmentQualityComment", { required: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.environmentQualityComment && (
                <span className="text-sm text-red-500">必須項目です。</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Submit
            </button>
          </form>
          {/* <div>
            <hr className="m-10" />
            <p className="text-2xl">アンケート一覧</p>
            <ul>
              {shopData
                .find((s) => s.id === watch("selectedShopId"))
                ?.anke.map((v) => <p>{v.guarantee}</p>)}
            </ul>
          </div> */}
        </div>
      ) : (
        <div className="m-10 flex justify-center" aria-label="読み込み中">
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
          <div className="mx-4 h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
        </div>
      )}
    </div>
  );
}
