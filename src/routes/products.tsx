import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState,useEffect } from "react";
import { z } from "zod";
import { FaFilter } from "react-icons/fa";
import { categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import axios from "axios";

const searchSchema = z.object({
  cat: z.string().optional().default("all"),
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/products")({
  validateSearch: (s) => searchSchema.parse(s),
  component: ProductsPage,
});

function ProductsPage() {
  const { cat, q } = Route.useSearch();
  const [sort, setSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(100000);
const [products, setProducts] = useState([]);
 const filtered = useMemo(() => {

  let list = products.filter(p =>

    (cat === "all" ||p.category.toLowerCase() === cat.toLowerCase()) &&

    (!q ||
      p.name.toLowerCase()
      .includes(q.toLowerCase())) &&

    p.price <= maxPrice

  );

  if (sort === "low") {

    list = [...list]
      .sort((a, b) => a.price - b.price);

  }

  else if (sort === "high") {

    list = [...list]
      .sort((a, b) => b.price - a.price);

  }

  else if (sort === "rating") {

    list = [...list]
      .sort((a, b) => b.rating - a.rating);

  }

  else {

    list = [...list]
      .sort((a, b) => b.sold - a.sold);

  }

  return list;

}, [products, cat, q, sort, maxPrice]);

  const current = categories.find(c => c.id === cat) || categories[0];
useEffect(() => {

  axios
    .get("https://bazarhub.onrender.com/products")

    .then(res => {

      setProducts(res.data);

    });

}, []);
  return (
    <div className="mx-auto w-[90%]
     px-3 py-5 sm:px-4">
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-foreground">{current.name}</span>
        {q && <span> / Search: "{q}"</span>}
      </nav>

      <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
        {/* Sidebar */}
        <aside className="hidden h-fit rounded-xl border border-border bg-card p-4 lg:block">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold"><FaFilter /> Filters</h3>
          <div className="mb-4">
            <div className="mb-2 text-xs font-semibold text-muted-foreground">CATEGORY</div>
            <div className="space-y-1">
              {categories.map(c => (
                <Link key={c.id} to="/products" search={{ cat: c.id, q } as any}
                  className={`block rounded-md px-2 py-1.5 text-sm transition ${cat === c.id ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold text-muted-foreground">MAX PRICE: ৳{maxPrice}</div>
            <input type="range" min={100} max={100000} step={100} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
          </div>
        </aside>

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
            <span className="text-sm"><b>{filtered.length}</b> products in <b>{current.name}</b></span>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary">
              <option value="popular">Most Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
              No products found. Try a different filter.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map(p =><ProductCard
  key={p._id}
  product={p}
/>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
