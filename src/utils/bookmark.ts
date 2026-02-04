export type Bookmark = {
  id: string;
  title: string;
  url: string;
  savedAt: number;
};

const STORAGE_KEY = "bookmarks";

/** 전체 북마크 가져오기 */
export function getBookmarks(): Bookmark[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/** 북마크 저장 (제목 포함) */
export function saveBookmark(title: string, url: string) {
  const bookmarks = getBookmarks();

  // 이미 저장된 기사면 중복 저장 방지
  if (bookmarks.some(b => b.url === url)) return;

  const newBookmark: Bookmark = {
    id: crypto.randomUUID(),
    title,
    url,
    savedAt: Date.now(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newBookmark, ...bookmarks])
  );
}

/** 북마크 삭제 */
export function removeBookmark(id: string) {
  const bookmarks = getBookmarks().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}
