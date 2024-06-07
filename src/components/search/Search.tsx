import { useCallback, useState } from "react";
import DropMenu from "../dropdown/DropDown";
import { ICoin } from "../api";

import "./search.css";

function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const defaultCoins = ["BTC", "ETH", "XTZ"];

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <div className="coin-panel">
      <div className="search-menu-coins">
        <div className="default-coins">
          {defaultCoins.map((coin: ICoin, index: number) => (
            <li key={index}>{coin}</li>
          ))}
        </div>
        <button className="btn-search" onClick={toggleOpen}>
          Search
        </button>
      </div>
      {open && <DropMenu />}
      <h2>Crypto Coins</h2>
    </div>
  );
}
export default Search;
