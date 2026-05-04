import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  FaSearch, FaShoppingCart, FaHeart, FaUser, FaSun, FaMoon, FaBars, FaTimes,
  FaBell, FaQuestionCircle, FaGlobe, FaMapMarkerAlt
} from "react-icons/fa";
import { useCart, useTheme, useWishlist } from "@/lib/store";
import { categories } from "@/data/products";

export function Header() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/products", search: { q, cat: "all" } as any });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur shadow-sm">
      {/* Top strip */}
      <div className="hidden gradient-warm text-warm-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><FaMapMarkerAlt /> Deliver to Dhaka</span>
            <span>Save More on App</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Sell on Bazaar</Link>
            <Link to="/" className="hover:underline">Track Order</Link>
            <Link to="/" className="hover:underline">Help</Link>
            <span className="flex items-center gap-1"><FaGlobe /> EN</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <button className="md:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-sunset text-warm-foreground font-black shadow">B</div>
          <span className="hidden text-xl font-extrabold tracking-tight sm:block">
            <span className="text-primary">Bazaar</span><span className="text-warm">Hub</span>
          </span>
        </Link>

        <form onSubmit={submit} className="flex flex-1 items-center overflow-hidden rounded-full border-2 border-primary/60 bg-background focus-within:border-primary">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands and categories..."
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button type="submit" className="flex items-center gap-1.5 gradient-warm px-4 py-2 text-sm font-semibold text-warm-foreground">
            <FaSearch /> <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        <div className="flex items-center gap-1 sm:gap-3">
          <button onClick={toggle} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Toggle theme">
            {theme === "dark" ? <FaSun className="text-warm" /> : <FaMoon className="text-primary" />}
          </button>
          <button className="hidden h-9 w-9 place-items-center rounded-full hover:bg-muted sm:grid" aria-label="Notifications">
            <FaBell />
          </button>
          <Link to="/wishlist" className="relative hidden h-9 w-9 place-items-center rounded-full hover:bg-muted sm:grid" aria-label="Wishlist">
            <FaHeart />
            {ids.length > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">{ids.length}</span>}
          </Link>
          <Link to="/cart" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Cart">
            <FaShoppingCart />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <Link to="/login" search={{ redirect: "/" } as any} className="hidden items-center gap-1.5 rounded-full border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground sm:inline-flex">
            <FaUser size={12} /> Login
          </Link>
        </div>
      </div>

      {/* Categories nav */}
      <nav className="hidden border-t border-border bg-card md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm scrollbar-hide">
          {categories.map(c => {
            const active = path === "/products" || (path === "/" && c.id === "all");
            return (
              <Link
                key={c.id}
                to="/products"
                search={{ cat: c.id, q: "" } as any}
                className={`shrink-0 rounded-full px-3 py-1.5 transition ${active && c.id === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground/80"}`}
              >
                {c.name}
              </Link>
            );
          })}
          <span className="mx-2 h-4 w-px bg-border" />
          <Link to="/" className="shrink-0 rounded-full px-3 py-1.5 text-warm hover:bg-muted">🔥 Flash Sale</Link>
          <Link to="/" className="shrink-0 rounded-full px-3 py-1.5 hover:bg-muted">New Arrivals</Link>
          <Link to="/" className="shrink-0 rounded-full px-3 py-1.5 hover:bg-muted">Best Sellers</Link>
          <Link to="/" className="shrink-0 rounded-full px-3 py-1.5 hover:bg-muted flex items-center gap-1"><FaQuestionCircle size={11}/> Help</Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="flex flex-col gap-1 p-3 text-sm">
            <Link to="/login" search={{ redirect: "/" } as any} onClick={() => setOpen(false)} className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Login / Sign up</Link>
            {categories.map(c => (
              <Link key={c.id} to="/products" search={{ cat: c.id, q: "" } as any} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-muted">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
