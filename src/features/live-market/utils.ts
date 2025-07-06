const SCROLL_OFFSET_KEY = "scrollOffset";

export const getInitialScrollOffset = () =>
  parseInt(localStorage.getItem(SCROLL_OFFSET_KEY) || "0");

export const updateScrollOffset = (scrollOffset: number) => {
    localStorage.setItem(SCROLL_OFFSET_KEY, String(scrollOffset));
}