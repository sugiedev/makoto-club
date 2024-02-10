import { NextResponse } from "next/server";
import { db } from "~/firebase/admin";
import { type Anke, type Shop } from "~/provider/ShopProvider";

export async function GET() {
  try {
    const shopsRef = db.collection("shops");
    const querySnapshot = await shopsRef.get();

    const shopsArray: Shop[] = [];

    // for...of ループを使用して非同期処理を待ちつつ処理を行う
    for (const doc of querySnapshot.docs) {
      const shopData = doc.data();

      const ankeRef = doc.ref.collection("anke");
      const ankeQuerySnapshot = await ankeRef.get();
      const ankeArray = ankeQuerySnapshot.docs.map(
        (adoc) =>
          ({
            shopId: doc.id,
            ankeId: adoc.id,
            shopName: shopData.shopName as string,
            serviceType: shopData.serviceType as string,
            prefecture: shopData.prefecture as string,
            ...adoc.data(),
          }) as Anke,
      );

      const shopWithAnke = {
        id: doc.id,
        ...shopData,
        anke: ankeArray,
      } as Shop;

      shopsArray.push(shopWithAnke);
    }

    console.table(shopsArray);

    return NextResponse.json({ data: shopsArray });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ result: "fail" });
  }
}
