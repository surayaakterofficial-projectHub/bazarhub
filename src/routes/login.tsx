


import { useContext, useState } from "react";
import { useNavigate, createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

import { AuthContext } from "@/provider/AuthProvider";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: (s.redirect as string) || "/",
  }),
  component: LoginPage,
});

function LoginPage() {
  const {
    createNewUser,
    userLogin,
    googleLogin,
    facebookLogin,
    resetPassword,
  } = useContext(AuthContext);

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const { redirect } = Route.useSearch();

  // ✅ LOGIN / SIGNUP
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔥 SIGNUP
      if (mode === "signup") {
        const result = await createNewUser(email, password, name);

        // 🔥 profile update
        await import("firebase/auth").then(({ updateProfile }) =>
          updateProfile(result.user, {
            displayName: name,
            photoURL: photo,
          })
        );

        toast.success(`Welcome ${name} 🎉`);
      }

      // 🔥 LOGIN
      else {
        await userLogin(email, password);

        toast.success("Login successful 🔥");
      }

      nav({ to: redirect || "/" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogle = async () => {
    try {
      await googleLogin();

      toast.success("Google Login Success");

      nav({ to: redirect || "/" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ✅ FACEBOOK LOGIN
  const handleFacebook = async () => {
    try {
      await facebookLogin();

      toast.success("Facebook Login Success");

      nav({ to: redirect || "/" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ✅ FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!email) {
      return toast.error("Please enter your email first");
    }

    try {
      await resetPassword(email);

      toast.success("Password reset email sent 📩");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
      <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="hidden gradient-sunset p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Welcome Back 👋
            </h1>

            <p className="mt-4 text-lg opacity-90">
              Login or create account to continue shopping with us.
            </p>
          </div>

          <div>
            <p className="opacity-80">
              Secure Authentication System with Firebase 🔥
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10">
          
          {/* TOP SWITCH */}
          <div className="mb-6 flex rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2 font-semibold transition ${
                mode === "login"
                  ? "bg-card shadow-md"
                  : "hover:bg-card/50"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-2 font-semibold transition ${
                mode === "signup"
                  ? "bg-card shadow-md"
                  : "hover:bg-card/50"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* TITLE */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Login to your account"
                : "Create your new account"}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-4">

            {/* NAME */}
            {mode === "signup" && (
              <Field
                icon={<FaUser />}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            )}

            {/* PHOTO */}
            {mode === "signup" && (
              <Field
                icon={<FaUser />}
                type="text"
                placeholder="Profile Photo URL"
                value={photo}
                onChange={(e: any) => setPhoto(e.target.value)}
              />
            )}

            {/* PHONE */}
            {mode === "signup" && (
              <Field
                icon={<FaPhone />}
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />
            )}

            {/* EMAIL */}
            <Field
              icon={<FaEnvelope />}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <Field
              icon={<FaLock />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            {/* FORGOT PASSWORD */}
            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* SUBMIT */}
            <button className="w-full rounded-xl gradient-warm py-3 font-bold text-white transition hover:scale-[1.01] active:scale-[0.99]">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-border"></div>
            <span className="text-sm text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 rounded-xl border py-3 font-medium transition hover:bg-muted"
            >
              <FaGoogle />
              Google
            </button>

            <button
              type="button"
              onClick={handleFacebook}
              className="flex items-center justify-center gap-2 rounded-xl border py-3 font-medium transition hover:bg-muted"
            >
              <FaFacebook />
              Facebook
            </button>
          </div>

          {/* BOTTOM */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="ml-1 font-semibold text-primary hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ INPUT FIELD
function Field({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4">
      <span className="text-muted-foreground">{icon}</span>

      <input
        {...props}
        required
        className="w-full bg-transparent py-3 outline-none"
      />
    </div>
  );
}

export default LoginPage;