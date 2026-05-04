import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FaShieldAlt, FaUndo, FaHeadset, FaBolt, FaArrowRight,
  FaThLarge, FaShoppingBasket, FaUtensils, FaTshirt, FaFemale,
  FaMobileAlt, FaCouch, FaSpa, FaFutbol, FaGamepad } from "react-icons/fa";
import { categories, products, flashSale } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const CAT_ICONS: Record<string, React.ReactNode> = {
  all: <FaThLarge />, grocery: <FaShoppingBasket />, restaurant: <FaUtensils />,
  mens: <FaTshirt />, womens: <FaFemale />, electronics: <FaMobileAlt />,
  home: <FaCouch />, beauty: <FaSpa />, sports: <FaFutbol />, kids: <FaGamepad />,
};

export const Route = createFileRoute("/")({
  component: Home,
});

function Countdown() {
  const [t, setT] = useState({ h: 5, m: 32, s: 10 });
  useEffect(() => {
    const i = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const Box = ({ n }: { n: number }) => (
    <span className="rounded bg-foreground px-1.5 py-0.5 font-mono text-sm text-background">{String(n).padStart(2, "0")}</span>
  );
  return <span className="flex items-center gap-1"><Box n={t.h}/>:<Box n={t.m}/>:<Box n={t.s}/></span>;
}

function Home() {
  const featured = products.filter(p => p.rating >= 4.5).slice(0, 12);
  const restaurant = products.filter(p => p.category === "restaurant");
  const grocery = products.filter(p => p.category === "grocery");

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4">
      {/* Hero */}
      <section className="grid gap-3 lg:grid-cols-[1fr_320px]">
        <div className="relative overflow-hidden rounded-2xl shadow-lg min-h-[280px] sm:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
            alt="Fresh shopping deals"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#306932]/90 via-[#306932]/70 to-transparent" />
          <div className="relative z-10 flex h-full max-w-xl flex-col justify-center p-6 text-white sm:p-10">
            <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">🌿 FRESH MEGA SALE</span>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight drop-shadow sm:text-5xl">Up to 70% off<br/>on everything you love</h1>
            <p className="mt-2 max-w-md text-sm opacity-95 sm:text-base">From kitchen essentials to fashion finds — fresh, friendly prices.</p>
            <Link to="/products" search={{ cat: "all", q: "" } as any} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary shadow hover:scale-[1.02] transition">
              Shop now <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-warm/15 text-warm"><FaBolt /></div>
            <div><div className="text-sm font-bold">Fast Delivery</div><div className="text-xs text-muted-foreground">Within 24 hours</div></div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><FaShieldAlt /></div>
            <div><div className="text-sm font-bold">Secure Pay</div><div className="text-xs text-muted-foreground">100% safe checkout</div></div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground"><FaUndo /></div>
            <div><div className="text-sm font-bold">Easy Returns</div><div className="text-xs text-muted-foreground">7-day return</div></div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-success/15 text-success"><FaHeadset /></div>
            <div><div className="text-sm font-bold">24/7 Support</div><div className="text-xs text-muted-foreground">We're here to help</div></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">Shop by Category</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10">
          {categories.map(c => (
            <Link key={c.id} to="/products" search={{ cat: c.id, q: "" } as any}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-full gradient-warm text-warm-foreground text-xl">
                {CAT_ICONS[c.id] ?? c.name[0]}
              </div>
              <span className="text-[11px] font-medium leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="mt-8 rounded-2xl border border-warm/30 bg-gradient-to-br from-warm/10 to-primary/5 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-warm">⚡ Flash Sale <Countdown /></h2>
          <Link to="/products" search={{ cat: "all", q: "" } as any} className="text-sm font-semibold text-primary hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {flashSale.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Restaurants */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">🍽️ Hot from Restaurants</h2>
          <Link to="/products" search={{ cat: "restaurant", q: "" } as any} className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {restaurant.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Grocery */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">🛒 Daily Grocery</h2>
          <Link to="/products" search={{ cat: "grocery", q: "" } as any} className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {grocery.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Featured */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">⭐ Top Rated for You</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl gradient-warm p-6 text-warm-foreground">
          <div className="text-sm font-bold opacity-80">FREE DELIVERY</div>
          <div className="mt-1 text-2xl font-extrabold">On orders above ৳999</div>
          <p className="mt-1 text-sm opacity-90">Across all major cities in Bangladesh</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-bold text-primary">DOWNLOAD APP</div>
          <div className="mt-1 text-2xl font-extrabold">Get extra 10% off</div>
          <p className="mt-1 text-sm text-muted-foreground">Available on Play Store & App Store</p>
        </div>
      </section>
    </div>
  );
}
