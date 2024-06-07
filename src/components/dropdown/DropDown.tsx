import { FC, useState } from "react";
import { ICoin } from "../api";
import List from "../list/List";

import "./dropdown.css";

const DropMenu: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<ICoin[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const showFavoritesCoins = (): void => {
    setShowFavorites(true);
  };
  const showAllCoins = (): void => {
    setShowFavorites(false);
  };
  const addFavorite = (coin: ICoin): void => {
    setFavorites([...favorites, coin]);
  };
  const removeFavorite = (coin: ICoin): void => {
    setFavorites(favorites.filter((c: ICoin) => c !== coin));
  };
  return (
    <div className="drop-menu open">
      <div className="search">
        <img
          src="https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
          alt="search"
        />
        <input
          onChange={handleChange}
          id="search"
          type="search"
          placeholder="Search..."
        />
      </div>
      <div className="btn-coins">
        <button onClick={showFavoritesCoins}>FAVORITES</button>
        <button onClick={showAllCoins}>ALL COINS</button>
      </div>
      <List
        query={query}
        coins={showFavorites ? favorites : undefined}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    </div>
  );
};
export default DropMenu;
