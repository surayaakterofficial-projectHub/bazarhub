import { Link } from "@tanstack/react-router";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import type { Product } from "@/data/products";
import { useCart, useWishlist } from "@/lib/store";
import { Stars } from "./Stars";
import { toast } from "sonner";
export function ProductCard({
  product
}: {
  product?: Product
}) {
if (!product) return null;

  const { add } = useCart();
  const { has, toggle } = useWishlist();
const discount = product?.oldPrice
  ? Math.round(
      (1 - product.price / product.oldPrice) * 100
    )
  : 0;

  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link to="/product/$id" params={{ id: product?._id }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={product?.image} alt={product?.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground shadow">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product?._id); }}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-card/90 text-primary shadow backdrop-blur transition hover:bg-card"
          aria-label="Wishlist"
        >
          {has(product?._id) ? <FaHeart size={12} className="text-destructive" /> : <FaRegHeart size={12} />}
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <Link to="/product/$id" params={{ id: product?._id }} className="line-clamp-2 text-xs font-medium leading-snug text-card-foreground hover:text-primary">
          {product?.name}
        </Link>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-primary">৳{product?.price}</span>
          {product?.oldPrice && <span className="text-[11px] text-muted-foreground line-through">৳{product?.oldPrice}</span>}
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <Stars value={product?.rating} size={11} />
          <span>{product?.sold} sold</span>
        </div>
        <button
          onClick={() => { add(product); toast.success("Added to cart", { description: product?.name }); }}
          className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-md gradient-warm px-2 py-1.5 text-[11px] font-semibold text-warm-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          <FaCartPlus size={11} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
