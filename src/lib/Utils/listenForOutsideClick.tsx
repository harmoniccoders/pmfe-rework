export default function listenForOutsideClicks(
  listening: any,
  setListening: any,
  searchRef: any,
  setIsSearchOpen: any
) {
  return () => {
    if (listening) return;
    if (!searchRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = searchRef.current;
        const node = evt.target;
        if (cur && cur.contains(node)) return;
        setIsSearchOpen(false);
      });
    });
  };
}
