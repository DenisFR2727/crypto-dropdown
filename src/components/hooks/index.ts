import { useState, useEffect } from "react";
import { ICoin } from "../api";

export const useFilterCoins = (coins: ICoin[], query: string) => {
  const [filteredCoins, setFilteredCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) => coin.toLowerCase().includes(query.toLowerCase()))
    );
  }, [coins, query]);

  return { filteredCoins };
};
