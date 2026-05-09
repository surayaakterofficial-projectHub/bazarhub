import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { useCart } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <FaShoppingBag size={64} className="mx-auto text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Link to="/" className="mt-5 inline-block rounded-md gradient-warm px-5 py-2.5 text-sm font-bold text-warm-foreground">Continue Shopping</Link>
      </div>
    );
  }

  const shipping = total > 999 ? 0 : 60;
  return (
    <div className="mx-auto w-[90%]  px-3 py-5 sm:px-4">
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart ({items.length})</h1>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-border bg-card p-2 sm:p-4">
          {items.map(({ product: p, qty }) => (
            <div key={p.id} className="flex gap-3 border-b border-border py-3 last:border-0">
              <Link to="/product/$id" params={{ id: p.id }} className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-24 sm:w-24">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to="/product/$id" params={{ id: p.id }} className="line-clamp-2 text-sm font-medium hover:text-primary">{p.name}</Link>
                  <div className="text-xs text-muted-foreground">{p.brand}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-border">
                    <button onClick={() => setQty(p.id, qty - 1)} className="grid h-7 w-7 place-items-center hover:bg-muted"><FaMinus size={9}/></button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(p.id, qty + 1)} className="grid h-7 w-7 place-items-center hover:bg-muted"><FaPlus size={9}/></button>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-primary">৳{p.price * qty}</div>
                    {qty > 1 && <div className="text-[11px] text-muted-foreground">৳{p.price} each</div>}
                  </div>
                </div>
              </div>
              <button onClick={() => { remove(p.id); toast("Removed from cart"); }} aria-label="Remove" className="self-start text-destructive hover:opacity-80">
                <FaTrash size={14}/>
              </button>
            </div>
          ))}
          <button onClick={clear} className="mt-3 text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-4 shadow-sm">
          <h3 className="mb-3 text-base font-bold">Order Summary</h3>
          <div className="space-y-2 border-b border-border pb-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>৳{total}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <span className="text-success">FREE</span> : `৳${shipping}`}</span></div>
          </div>
          <div className="flex items-baseline justify-between py-3">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-extrabold text-primary">৳{total + shipping}</span>
          </div>
          <button onClick={() => navigate({ to: "/checkout" })} className="w-full rounded-md gradient-warm py-2.5 text-sm font-bold text-warm-foreground hover:opacity-90">
            Proceed to Checkout
          </button>
          <div className="mt-3 rounded-md bg-muted/50 p-2 text-[11px] text-muted-foreground">
            🛡️ Secure checkout · Pay on delivery · Easy returns
          </div>
        </aside>
      </div>
    </div>
  );
}
