import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider, CommentsProvider, ThemeProvider, WishlistProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import AuthProvider from "../provider/AuthProvider";


function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-extrabold text-primary">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found</p>
      <a href="/" className="mt-4 rounded-md gradient-warm px-4 py-2 text-sm font-semibold text-warm-foreground">Go home</a>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BazaarHub — Bangladesh's Friendly Marketplace" },
      { name: "description", content: "Shop groceries, fashion, electronics, beauty, restaurant food and more. Warm, fast, and reliable." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),

  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return ( <AuthProvider>
<ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CommentsProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1"><Outlet /></main>
              <Footer />
              <Toaster richColors position="top-center" />
            </div>
          </CommentsProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </AuthProvider>
    
  );
}
