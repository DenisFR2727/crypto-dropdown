import { useState, useEffect, useCallback } from "react";
import { fetchCoinList } from "../api";
import { ICoin } from "../api";
import { useFilterCoins } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";

import "./list.css";

interface IListProps {
  query: string;
  coins?: ICoin[];
  addFavorite: (coin: ICoin) => void;
  removeFavorite: (coin: ICoin) => void;
}
function List({ query, coins, addFavorite, removeFavorite }: IListProps) {
  const [allCoins, setAllCoins] = useState<ICoin[]>([]);
  const coinsToFilter = coins ?? allCoins;
  const { filteredCoins } = useFilterCoins(coinsToFilter, query);
  const [favoriteCoins, setFavoriteCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchCoinList();
      setAllCoins(data);
    };
    fetchData();
  }, []);

  const handleAddFavorite = useCallback(
    (coin: ICoin) => {
      if (favoriteCoins.find((c: ICoin) => c === coin)) {
        setFavoriteCoins(favoriteCoins.filter((c: ICoin) => c !== coin));
        removeFavorite(coin);
      } else {
        setFavoriteCoins([...favoriteCoins, coin]);
        addFavorite(coin);
      }
    },
    [addFavorite, removeFavorite, favoriteCoins]
  );
  return (
    <div className="list-coins">
      {filteredCoins.map((coin: ICoin, ind: number) => (
        <li key={ind}>
          <FontAwesomeIcon
            className="star"
            icon={favoriteCoins.includes(coin) ? fasStar : farStar}
            onClick={() => handleAddFavorite(coin)}
          />
          {coin}
        </li>
      ))}
    </div>
  );
}

export default List;
