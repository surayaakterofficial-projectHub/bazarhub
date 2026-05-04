import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaBolt, FaTruck, FaShieldAlt, FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { products, type Product } from "@/data/products";
import { useCart, useWishlist } from "@/lib/store";
import { Stars } from "@/components/Stars";
import { Comments } from "@/components/Comments";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }): Product => {
    const p = products.find(x => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-10 text-center"><h1>Product not found</h1><Link to="/" className="text-primary">Go home</Link></div>
  ),
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4">
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/products" search={{ cat: p.category, q: "" } as any} className="hover:text-primary capitalize">{p.category}</Link> /{" "}
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr]">
        <div className="overflow-hidden rounded-xl bg-muted">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-xs font-medium uppercase text-muted-foreground">{p.brand}</div>
          <h1 className="mt-1 text-xl font-bold sm:text-2xl">{p.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <Stars value={p.rating} />
            <span className="text-muted-foreground">{p.rating} ({p.reviews} reviews)</span>
            <span className="text-muted-foreground">| {p.sold}+ sold</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3 rounded-lg bg-warm/10 p-3">
            <span className="text-3xl font-extrabold text-primary">৳{p.price}</span>
            {p.oldPrice && (
              <>
                <span className="text-base text-muted-foreground line-through">৳{p.oldPrice}</span>
                <span className="rounded bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">-{discount}%</span>
              </>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold">Highlights</h3>
            <ul className="mt-1.5 space-y-1 text-sm text-foreground/80">
              {p.highlights.map((h: string, i: number) => (
                <li key={i} className="flex items-center gap-2"><FaCheck className="text-success" size={11} /> {h}</li>
              ))}
            </ul>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center rounded-md border border-border">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center hover:bg-muted"><FaMinus size={10}/></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><FaPlus size={10}/></button>
            </div>
            <span className="text-xs text-muted-foreground">{p.stock} in stock</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => { add(p, qty); toast.success(`Added ${qty} to cart`); }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-card px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground">
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={() => { add(p, qty); toast.success("Going to checkout..."); }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg gradient-warm px-5 py-2.5 text-sm font-bold text-warm-foreground shadow hover:opacity-90">
              <FaBolt /> Buy Now
            </button>
            <button onClick={() => toggle(p.id)} aria-label="Wishlist"
              className="grid h-11 w-11 place-items-center rounded-lg border border-border hover:bg-muted">
              {has(p.id) ? <FaHeart className="text-destructive" /> : <FaRegHeart />}
            </button>
          </div>

          <div className="mt-5 grid gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <div className="flex items-center gap-2"><FaTruck className="text-primary" /> Free delivery on orders above ৳999</div>
            <div className="flex items-center gap-2"><FaShieldAlt className="text-success" /> 7-day easy return & secure payment</div>
          </div>
        </div>
      </div>

      <Comments productId={p.id} />

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {related.map(r => <ProductCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
