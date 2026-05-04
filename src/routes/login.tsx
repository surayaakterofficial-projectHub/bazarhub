import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuth } from "@/lib/store";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: (s.redirect as string) || "/" }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const { redirect } = Route.useSearch();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const display = name.trim() || email.split("@")[0] || "User";
    login(display);
    toast.success(mode === "login" ? `Welcome back, ${display}!` : `Account created — welcome, ${display}!`);
    nav({ to: redirect || "/" });
  };

  return (
    <div className="mx-auto flex max-w-5xl items-center px-4 py-10">
      <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:grid-cols-2">
        <div className="hidden gradient-sunset p-10 text-warm-foreground md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-background/20 font-black backdrop-blur">B</div>
              <span className="text-xl font-extrabold">BazaarHub</span>
            </div>
            <h2 className="mt-10 text-3xl font-extrabold">Welcome back!</h2>
            <p className="mt-2 opacity-90">Shop millions of products at fresh, friendly prices. Delivered to your doorstep.</p>
          </div>
          <ul className="space-y-2 text-sm opacity-90">
            <li>✓ Free delivery on orders above ৳999</li>
            <li>✓ Secure payments & easy returns</li>
            <li>✓ 24/7 customer support</li>
          </ul>
        </div>

        <form onSubmit={submit} className="space-y-4 p-6 sm:p-10">
          <div className="flex rounded-lg bg-muted p-1">
            <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${mode === "login" ? "bg-card shadow text-primary" : "text-muted-foreground"}`}>Login</button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-card shadow text-primary" : "text-muted-foreground"}`}>Sign Up</button>
          </div>

          <h2 className="text-xl font-bold">{mode === "login" ? "Sign in to your account" : "Create a new account"}</h2>

          {mode === "signup" && (
            <Field icon={<FaUser />} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Field icon={<FaEnvelope />} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode === "signup" && <Field icon={<FaPhone />} type="tel" placeholder="Phone number" />}
          <Field icon={<FaLock />} type="password" placeholder="Password" />

          {mode === "login" && (
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary" /> Remember me</label>
              <a className="text-primary hover:underline cursor-pointer">Forgot?</a>
            </div>
          )}

          <button className="w-full rounded-md gradient-warm py-2.5 text-sm font-bold text-warm-foreground shadow hover:opacity-90">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-border py-2 text-sm hover:bg-muted">
              <FaGoogle className="text-destructive" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-border py-2 text-sm hover:bg-muted">
              <FaFacebook className="text-primary" /> Facebook
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our <Link to="/" className="text-primary">Terms</Link> & <Link to="/" className="text-primary">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>
      <input {...props} required className="flex-1 bg-transparent py-2.5 text-sm outline-none" />
    </div>
  );
}
