"use client";
import { createContext, useState, useEffect, type ReactNode } from "react";

export type Shop = {
  id: string;
  prefecture: string;
  serviceType: string;
  shopName: string;
  anke: Anke[];
};

export type Anke = {
  shopId: string;
  prefecture: string;
  serviceType: string;
  shopName: string;
  ankeId: string;
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

interface ShopDataContextType {
  shopData: Shop[];
  isLoading: boolean;
  getShopById: (id: string) => Shop | undefined;
}

export const ShopDataContext = createContext<ShopDataContextType>({
  shopData: [],
  isLoading: false,
  getShopById: () => undefined, // デフォルトの関数はundefinedを返す
});

export const ShopDataProvider = ({ children }: { children: ReactNode }) => {
  const [shopData, setShopData] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchShopData = async () => {
    const response = await fetch("/api/getShopsData", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = (await response.json()) as {
      data: Shop[];
    };
    setShopData(responseData.data);
  };

  useEffect(() => {
    void fetchShopData();
    setIsLoading(false);
  }, []);

  // idからShopを取得する関数
  const getShopById = (id: string): Shop | undefined => {
    return shopData.find((shop) => shop.id === id);
  };

  return (
    <ShopDataContext.Provider value={{ shopData, isLoading, getShopById }}>
      {children}
    </ShopDataContext.Provider>
  );
};
