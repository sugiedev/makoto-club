export const LineRating = ({
  kuchikomiCount,
  totalRating,

  totalCustomerQualityRating,
  totalEnvironmentQualityRating,
  totalGuaranteeRating,
  totalStaffQualityRating,
  totalTurnoverRateRating,
}: {
  kuchikomiCount: number;
  totalRating: number;

  totalCustomerQualityRating: number;
  totalEnvironmentQualityRating: number;
  totalGuaranteeRating: number;
  totalStaffQualityRating: number;
  totalTurnoverRateRating: number;
}) => {
  return (
    <>
      <div className="mb-5 flex items-center">
        <p className="m-2 inline-flex items-center rounded bg-blue-100 p-1.5 text-3xl font-semibold text-blue-800 ">
          {totalRating}
        </p>
        <p className="ms-2 text-2xl font-medium text-gray-900">総合評価</p>
        <span className="mx-2 h-1 w-1 rounded-full bg-gray-900"></span>
        <p className="text-lg font-medium text-gray-500 ">
          {kuchikomiCount}件の口コミ
        </p>
      </div>
      <div className="gap-8 px-10">
        <div>
          <RatingItem label="バック率" rating={totalGuaranteeRating} />
          <RatingItem label="回転率" rating={totalTurnoverRateRating} />
          <RatingItem label="客層" rating={totalCustomerQualityRating} />
          <RatingItem label="スタッフ" rating={totalStaffQualityRating} />
          <RatingItem label="環境" rating={totalEnvironmentQualityRating} />
        </div>
      </div>
    </>
  );
};

const RatingItem = ({ label, rating }: { label: string; rating: number }) => {
  return (
    <dl>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <span className="text-sm font-medium text-gray-500 ">{rating}</span>
      <dd className="mb-3 flex items-center">
        <div className="me-2 h-2.5 w-full rounded bg-gray-200 ">
          <div
            className="h-2.5 w-[100%] rounded bg-blue-600"
            style={{ width: `${(rating / 5) * 100}%` }}
          ></div>
        </div>
      </dd>
    </dl>
  );
};
