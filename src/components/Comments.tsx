import { useMemo, useState } from "react";
import { FaTrash, FaUserCircle, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { useComments } from "@/lib/store";
import { StarPicker, Stars } from "./Stars";
import { toast } from "sonner";

export function Comments({ productId }: { productId: string }) {
  const { forProduct, add, remove, currentUser, isAdmin, isLoggedIn } = useComments();
 

const list = useMemo(() => {

  if (typeof forProduct !== "function") {

    return [];

  }

  return forProduct(productId);

}, [forProduct, productId]);



  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to post a review");
      navigate({ to: "/login", search: { redirect: window.location.pathname } as any });
      return;
    }
    if (!text.trim()) return toast.error("Please write a review");
    add({ productId, user: currentUser, rating, text: text.trim() });
    setText(""); setRating(5);
    toast.success("Review posted!");
  };

  const avg = list.length ? list.reduce((s, c) => s + c.rating, 0) / list.length : 0;

  return (
    <section className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <h3 className="text-lg font-bold">Customer Reviews ({list.length})</h3>
        {list.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-warm">{avg.toFixed(1)}</span>
            <Stars value={avg} size={16} />
          </div>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center">
          <FaLock className="text-primary" size={22} />
          <p className="text-sm font-medium">You must be logged in to post a review.</p>
          <Link to="/login" search={{ redirect: typeof window !== "undefined" ? window.location.pathname : "/" } as any} className="rounded-md gradient-warm px-4 py-2 text-sm font-semibold text-warm-foreground shadow hover:opacity-90">
            Login to comment
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Posting as <span className="text-primary">{currentUser}</span>{isAdmin && <span className="ml-1 rounded bg-warm px-1.5 py-0.5 text-[10px] font-bold text-warm-foreground">ADMIN</span>}</span>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Share your experience with this product..."
            className="w-full rounded-md border border-border bg-background p-2 text-sm outline-none focus:border-primary"
          />
          <button className="rounded-md gradient-warm px-4 py-2 text-sm font-semibold text-warm-foreground shadow hover:opacity-90">
            Post Review
          </button>
        </form>
      )}

      <div className="mt-5 space-y-4">
        {list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>}
        {list.map(c => {
          const canDelete = isAdmin || c.user === currentUser;
          return (
            <div key={c.id} className="flex gap-3 border-b border-border pb-4 last:border-0">
              <FaUserCircle size={36} className="shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-semibold">{c.user}</span>
                    {c.user === currentUser && <span className="ml-2 text-[10px] text-muted-foreground">(you)</span>}
                    <div className="mt-0.5"><Stars value={c.rating} size={11} /></div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    {canDelete && (
                      <button onClick={() => { remove(c.id); toast("Review deleted"); }} className="text-destructive hover:opacity-80" aria-label="Delete">
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-foreground/90">{c.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
