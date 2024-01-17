"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  type: string;
  shopName: string;
  date: string;
  age: string;
  spec: string;
  content: string;
};

const Anke = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
        <p>
          musume connect審査フォーム（＋店舗申請） musume
          connect登録用のクチコミ審査フォームです。
          ムスメコネクトは日本最大の風俗女性キャスト専用の口コミサイトです。ムスメコネクトは原則女性キャスト様以外は閲覧することができないため、審査制となっています。
          審査に合格すれば18000件以上の口コミが無料・無期限で閲覧できます。
          ムスメコネクトについてもっと知りたい方は下記のリンクをご参照ください。
          ムスメコネクトとは？
          審査に合格した場合、口コミはサイト内で公開され、会員登録が完了します。
          まだムスメコネクトに掲載されていない店舗の口コミを書きたい時もご利用ください。
          ※頂いたアドレスには確認メールをお送りします。
          毎月3名様に5000円分のAmazonギフト券が当たるキャンペーンも実施しておりますので、ぜひご登録ください！
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          項目１
        </div>
        <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          項目２
        </div>
        <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          項目3...
        </div>
        {/* <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          <p className="mb-2 px-4 py-2 text-xl font-medium text-gray-900">
            情報区分
          </p>

          <div className="flex space-x-4 px-2">
            <div className="flex items-center rounded border border-gray-200 bg-yellow-200 p-2">
              <label
                htmlFor="bordered-radio-1"
                className="text-lx bg-yellow ml-2 py-4 text-gray-900"
              >
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value="優良店情報"
                  className="h-4 w-4 border-gray-300 bg-gray-100 p-2 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  {...register("type")}
                />
                👼優良店舗情報👼
              </label>
            </div>

            <div className="flex items-center rounded border border-gray-200 bg-purple-300 p-2">
              <label
                htmlFor="bordered-radio-2"
                className="text-lx ml-2 px-2 py-4 text-gray-900"
              >
                <input
                  id="bordered-radio-2"
                  type="radio"
                  value="悪質店情報"
                  className="text-lx h-4 w-4 border-gray-300 bg-gray-100 p-2 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  {...register("type")}
                />
                👿悪質店情報👿
              </label>
            </div>
          </div>
        </div>

        <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          <label>
            <p className="mb-2 px-4 py-2 text-xl text-gray-900">店舗名</p>
            <div className="m-2">
              <input
                className="text-lx block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                {...register("shopName")}
              />
            </div>
          </label>
        </div> */}

        <div className="mt-1 rounded rounded-t-lg border border-gray-300 bg-white p-2 shadow-xl">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="label-white w-full transform rounded bg-blue-500 px-4 py-4 text-white transition-transform duration-200 hover:scale-95 hover:bg-blue-400"
          >
            送信する
          </button>
        </div>
      </form>
    </div>
  );
};

export default Anke;
