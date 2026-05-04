import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaStickyNote,
  FaMoneyBillWave, FaMobileAlt, FaCreditCard, FaUniversity, FaTruck, FaLock,
} from "react-icons/fa";
import { useCart } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

type Pay = "cod" | "bkash" | "nagad" | "rocket" | "card" | "bank";

const payments: { id: Pay; name: string; icon: React.ReactNode; note: string }[] = [
  { id: "cod", name: "Cash on Delivery", icon: <FaMoneyBillWave />, note: "Pay when you receive" },
  { id: "bkash", name: "bKash", icon: <FaMobileAlt />, note: "Mobile wallet" },
  { id: "nagad", name: "Nagad", icon: <FaMobileAlt />, note: "Mobile wallet" },
  { id: "rocket", name: "Rocket", icon: <FaMobileAlt />, note: "Mobile wallet" },
  { id: "card", name: "Credit / Debit Card", icon: <FaCreditCard />, note: "Visa, Mastercard, Amex" },
  { id: "bank", name: "Bank Transfer", icon: <FaUniversity />, note: "Direct bank deposit" },
];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const nav = useNavigate();
  const [pay, setPay] = useState<Pay>("cod");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "Dhaka", area: "", zip: "", notes: "",
    cardNo: "", cardName: "", expiry: "", cvv: "", mobileNo: "",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const shipping = total > 999 ? 0 : 60;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/" className="mt-4 inline-block rounded-md gradient-warm px-5 py-2.5 text-sm font-bold text-warm-foreground">Go shopping</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      return toast.error("Please fill required fields");
    }
    toast.success("Order placed successfully! 🎉", { description: `Order total ৳${grand} • ${payments.find(p => p.id === pay)?.name}` });
    clear();
    setTimeout(() => nav({ to: "/" }), 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {/* Contact */}
          <Section title="Contact Information" icon={<FaUser />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field icon={<FaUser />} placeholder="Full name *" value={form.name} onChange={(v) => set("name", v)} required />
              <Field icon={<FaPhone />} placeholder="Phone number *" value={form.phone} onChange={(v) => set("phone", v)} required type="tel" />
              <div className="sm:col-span-2">
                <Field icon={<FaEnvelope />} placeholder="Email address" value={form.email} onChange={(v) => set("email", v)} type="email" />
              </div>
            </div>
          </Section>

          {/* Shipping */}
          <Section title="Shipping Address" icon={<FaTruck />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field icon={<FaMapMarkerAlt />} placeholder="Street address, house, road *" value={form.address} onChange={(v) => set("address", v)} required />
              </div>
              <Select icon={<FaCity />} value={form.city} onChange={(v) => set("city", v)} options={["Dhaka","Chittagong","Sylhet","Khulna","Rajshahi","Barisal","Rangpur","Mymensingh"]} />
              <Field icon={<FaMapMarkerAlt />} placeholder="Area / Thana" value={form.area} onChange={(v) => set("area", v)} />
              <Field icon={<FaMapMarkerAlt />} placeholder="ZIP / Postal code" value={form.zip} onChange={(v) => set("zip", v)} />
              <div className="sm:col-span-2">
                <Field icon={<FaStickyNote />} placeholder="Order notes (optional)" value={form.notes} onChange={(v) => set("notes", v)} />
              </div>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment Method" icon={<FaCreditCard />}>
            <div className="grid gap-2 sm:grid-cols-2">
              {payments.map(p => (
                <label key={p.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${pay === p.id ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border hover:border-primary/50"}`}>
                  <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} className="accent-primary" />
                  <span className="grid h-9 w-9 place-items-center rounded-md gradient-warm text-warm-foreground">{p.icon}</span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">{p.note}</span>
                  </span>
                </label>
              ))}
            </div>

            {(pay === "bkash" || pay === "nagad" || pay === "rocket") && (
              <div className="mt-3 rounded-lg bg-muted/50 p-3">
                <Field icon={<FaMobileAlt />} placeholder={`${pay === "bkash" ? "bKash" : pay === "nagad" ? "Nagad" : "Rocket"} mobile number`} value={form.mobileNo} onChange={(v) => set("mobileNo", v)} />
                <p className="mt-2 text-xs text-muted-foreground">You'll receive a payment request on your mobile.</p>
              </div>
            )}
            {pay === "card" && (
              <div className="mt-3 grid gap-3 rounded-lg bg-muted/50 p-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field icon={<FaCreditCard />} placeholder="Card number" value={form.cardNo} onChange={(v) => set("cardNo", v)} />
                </div>
                <Field icon={<FaUser />} placeholder="Cardholder name" value={form.cardName} onChange={(v) => set("cardName", v)} />
                <Field icon={<FaLock />} placeholder="MM/YY" value={form.expiry} onChange={(v) => set("expiry", v)} />
                <Field icon={<FaLock />} placeholder="CVV" value={form.cvv} onChange={(v) => set("cvv", v)} />
              </div>
            )}
            {pay === "bank" && (
              <div className="mt-3 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                Transfer to: <strong>BazaarHub Ltd · DBBL · A/C 123-456-789</strong>. Use your phone as reference.
              </div>
            )}
          </Section>
        </div>

        {/* Summary */}
        <aside className="h-fit space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-24">
          <h3 className="text-base font-bold">Order Summary</h3>
          <div className="max-h-60 space-y-2 overflow-auto pr-1">
            {items.map(({ product: p, qty }) => (
              <div key={p.id} className="flex items-center gap-2 text-sm">
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                <span className="line-clamp-1 flex-1">{p.name} <span className="text-muted-foreground">×{qty}</span></span>
                <span className="font-semibold">৳{p.price * qty}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>৳{total}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <span className="text-success">FREE</span> : `৳${shipping}`}</span></div>
          </div>
          <div className="flex items-baseline justify-between border-t border-border pt-3">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-extrabold text-primary">৳{grand}</span>
          </div>
          <button type="submit" className="w-full rounded-md gradient-warm py-2.5 text-sm font-bold text-warm-foreground shadow hover:opacity-90">
            Place Order
          </button>
          <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <FaLock size={10} /> Secure & encrypted checkout
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
        <span className="grid h-7 w-7 place-items-center rounded-md gradient-warm text-warm-foreground">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ icon, value, onChange, ...props }: { icon: React.ReactNode; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} {...props} className="flex-1 bg-transparent py-2.5 text-sm outline-none" />
    </div>
  );
}

function Select({ icon, value, onChange, options }: { icon: React.ReactNode; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent py-2.5 text-sm outline-none">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
