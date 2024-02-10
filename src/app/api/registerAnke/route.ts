import { NextResponse } from "next/server";
import { db } from "~/firebase/admin";

export type Item = {
  /* 名称 */
  title: string;
  /* 画像URL */
  cardImgsUrl: string[];
  /* 住所 */
  address: {
    /* 都道府県 */
    prefecture: string;
    /* 市区町村 */
    city: string;
    /* その他の住所情報 */
    other: string;
    /* google map 埋め込み用URL */
    url: string;
  };
};

export type Product = {
  /* 野菜の名前 */
  name: string;
  /* 値段 */
  price: number;
  /* 野菜の写真URL */
  imgUrl: string;
  /* 野菜の動画URL */
  videoUrl: string;
};

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

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Inputs;
    const {
      //選択された店舗名
      selectedShopId,
      newShopName,
      newPrefecture,
      newServiceType,
      workingDate,
      workingAge,
      workingSpec,
      workingStyle,
      waitTime,
      guarantee,
      turnoverRate,
      average,
      customerQuality,
      customerQualityComment,
      staffQuality,
      staffQualityComment,
      environmentQuality,
      environmentQualityComment,
      ratingGuarantee,
      ratingTurnoverRate,
      ratingCustomerQuality,
      ratingStaffQuality,
      ratingEnvironmentQuality,
      totalRating,
      writingDateStr,
    } = data;

    type Anke = {
      writingDateStr: string;
      workingDate: string;
      workingAge: string;
      workingSpec: string;
      workingStyle: string;
      waitTime: string;
      guarantee: string;
      turnoverRate: string;
      average: string;
      customerQuality: string;
      customerQualityComment: string;
      staffQuality: string;
      staffQualityComment: string;
      environmentQuality: string;
      environmentQualityComment: string;
      createdAt: Date;
      ratingGuarantee: "1" | "2" | "3" | "4" | "5";
      ratingTurnoverRate: "1" | "2" | "3" | "4" | "5";
      ratingCustomerQuality: "1" | "2" | "3" | "4" | "5";
      ratingStaffQuality: "1" | "2" | "3" | "4" | "5";
      ratingEnvironmentQuality: "1" | "2" | "3" | "4" | "5";
      totalRating: number;
    };

    const anke: Anke = {
      writingDateStr,
      ratingGuarantee,
      ratingTurnoverRate,
      ratingCustomerQuality,
      ratingStaffQuality,
      ratingEnvironmentQuality,
      totalRating,
      workingDate,
      workingAge,
      workingSpec,
      workingStyle,
      waitTime,
      guarantee,
      turnoverRate,
      average,
      customerQuality,
      customerQualityComment,
      staffQuality,
      staffQualityComment,
      environmentQuality,
      environmentQualityComment,
      createdAt: new Date(),
    };

    if (selectedShopId === "register") {
      const colRef = db.collection("shops");

      const docRef = await colRef.add({
        shopName: newShopName,
        prefecture: newPrefecture,
        serviceType: newServiceType,
      });

      await docRef.collection("anke").add({ ...anke });
    } else {
      await db
        .collection("shops")
        .doc(selectedShopId)
        .collection("anke")
        .add({ ...anke });

      await db
        .collection("shops")
        .doc(selectedShopId)
        .collection("anke")
        .add({ ...anke });
    }

    return NextResponse.json({ result: "ok" });

    // // itemに対してサブコレクションproductsを追加

    // return NextResponse.json({ result: itemRef.id });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ result: "fail" });
  }
}
