import { useEffect, RefObject } from "react";

function useAnimation(
  filteredCoins: any[],
  listRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (listRef.current) {
      const listItems = listRef.current.children;
      for (let i = 0; i < listItems.length; i++) {
        const timer = setTimeout(() => {
          const listItem = listItems[i] as HTMLElement;
          if (document.body.contains(listItem)) {
            listItem.style.opacity = "1";
            listItem.style.transform = "translateY(0)";
          }
        }, i * 100);
        timers.push(timer);
      }
    }
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [filteredCoins, listRef]);
}

export { useAnimation };
