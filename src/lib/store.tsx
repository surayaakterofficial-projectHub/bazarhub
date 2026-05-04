import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

// ---------- THEME ----------
type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);

// ---------- CART ----------
export type CartItem = { product: Product; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};
const CartContext = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try { const s = localStorage.getItem("cart"); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const add = (p: Product, qty = 1) => setItems(prev => {
    const i = prev.find(x => x.product.id === p.id);
    if (i) return prev.map(x => x.product.id === p.id ? { ...x, qty: x.qty + qty } : x);
    return [...prev, { product: p, qty }];
  });
  const remove = (id: string) => setItems(prev => prev.filter(x => x.product.id !== id));
  const setQty = (id: string, qty: number) => setItems(prev => qty <= 0 ? prev.filter(x => x.product.id !== id) : prev.map(x => x.product.id === id ? { ...x, qty } : x));
  const clear = () => setItems([]);
  const total = items.reduce((s, x) => s + x.product.price * x.qty, 0);
  const count = items.reduce((s, x) => s + x.qty, 0);

  return <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);

// ---------- WISHLIST ----------
const WishCtx = createContext<{ ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean }>({ ids: [], toggle: () => {}, has: () => false });
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { try { const s = localStorage.getItem("wish"); if (s) setIds(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem("wish", JSON.stringify(ids)); }, [ids]);
  return <WishCtx.Provider value={{ ids, toggle: (id) => setIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), has: (id) => ids.includes(id) }}>{children}</WishCtx.Provider>;
}
export const useWishlist = () => useContext(WishCtx);

// ---------- COMMENTS / RATINGS ----------
export type Comment = { id: string; productId: string; user: string; rating: number; text: string; createdAt: number };
const CmCtx = createContext<{
  forProduct: (id: string) => Comment[];
  add: (c: Omit<Comment, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  currentUser: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
}>({ forProduct: () => [], add: () => {}, remove: () => {}, currentUser: "Guest", isAdmin: false, isLoggedIn: false, login: () => {}, logout: () => {} });

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState("Guest");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem("comments"); if (s) setComments(JSON.parse(s)); } catch {}
    const u = localStorage.getItem("user");
    const auth = localStorage.getItem("auth") === "1";
    if (u && auth) { setCurrentUser(u); setIsAdmin(u.toLowerCase() === "admin"); setIsLoggedIn(true); }
    else {
      const guest = "Guest" + Math.floor(Math.random() * 9000 + 1000);
      setCurrentUser(guest);
    }
  }, []);
  useEffect(() => { localStorage.setItem("comments", JSON.stringify(comments)); }, [comments]);
  const login = (name: string) => {
    const n = name.trim() || "User";
    localStorage.setItem("user", n);
    localStorage.setItem("auth", "1");
    setCurrentUser(n); setIsAdmin(n.toLowerCase() === "admin"); setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    const guest = "Guest" + Math.floor(Math.random() * 9000 + 1000);
    setCurrentUser(guest); setIsAdmin(false);
  };
  return (
    <CmCtx.Provider value={{
      forProduct: (id) => comments.filter(c => c.productId === id).sort((a,b) => b.createdAt - a.createdAt),
      add: (c) => setComments(p => [...p, { ...c, id: crypto.randomUUID(), createdAt: Date.now() }]),
      remove: (id) => setComments(p => p.filter(c => c.id !== id)),
      currentUser, isAdmin, isLoggedIn, login, logout,
    }}>{children}</CmCtx.Provider>
  );
}
export const useComments = () => useContext(CmCtx);
export const useAuth = () => {
  const { isLoggedIn, currentUser, isAdmin, login, logout } = useContext(CmCtx);
  return { isLoggedIn, currentUser, isAdmin, login, logout };
};
