import {
  createContext,
  useContext,  useEffect,
  useState,
  type ReactNode,
} from "react";



import type { Product }
from "@/data/products";


// ---------- THEME ----------

type Theme = "light" | "dark";

const ThemeCtx =
  createContext<{
    theme: Theme;
    toggle: () => void;
  }>({

    theme: "light",

    toggle: () => {},

  });

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [theme, setTheme] =
    useState<Theme>("light");

  useEffect(() => {

    const saved =
      (localStorage.getItem(
        "theme"
      ) as Theme) ||

      (
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches

          ? "dark"

          : "light"
      );

    setTheme(saved);

  }, []);

  useEffect(() => {

    document.documentElement
      .classList.toggle(
        "dark",
        theme === "dark"
      );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  return (

    <ThemeCtx.Provider

      value={{

        theme,

        toggle: () =>

          setTheme((t) =>

            t === "light"
              ? "dark"
              : "light"

          ),

      }}

    >

      {children}

    </ThemeCtx.Provider>

  );

}

export const useTheme =
  () => useContext(ThemeCtx);


// ---------- CART ----------

export type CartItem = {

  product: Product;

  qty: number;

};

type CartCtx = {

  items: CartItem[];

  add: (
    p: Product,
    qty?: number
  ) => void;

  remove: (
    id: string
  ) => void;

  setQty: (
    id: string,
    qty: number
  ) => void;

  clear: () => void;

  total: number;

  count: number;

};

const CartContext =
  createContext<CartCtx>(
    {} as CartCtx
  );

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
const [items, setItems] =
  useState<CartItem[]>(() => {

    const saved =
      localStorage.getItem(
        "cart"
      );

    return saved
      ? JSON.parse(saved)
      : [];

});



  // LOAD CART 😄

  

  // SAVE CART 😄

  useEffect(() => {

    localStorage.setItem(

      "cart",

      JSON.stringify(items)

    );

  }, [items]);

  // ADD 😄

  const add = (
    p: Product,
    qty = 1
  ) => {

    setItems((prev) => {

      const existing =
        prev.find(

          (x) =>

            x.product._id === p._id

        );

      // already exists 😄

      if (existing) {

        return prev.map((x) =>

          x.product._id === p._id

            ? {

                ...x,

                qty:
                  x.qty + qty,

              }

            : x

        );

      }

      // new item 😄

      return [

        ...prev,

        {

          product: p,

          qty,

        },

      ];

    });

  };

  // REMOVE 😄

  const remove = (
    id: string
  ) => {

    setItems((prev) =>

      prev.filter(

        (x) =>

          x.product._id !== id

      )

    );

  };

  // SET QTY 😄

  const setQty = (
    id: string,
    qty: number
  ) => {

    setItems((prev) =>

      qty <= 0

        ? prev.filter(

            (x) =>

              x.product._id !== id

          )

        : prev.map((x) =>

            x.product._id === id

              ? {

                  ...x,

                  qty,

                }

              : x

          )

    );

  };

  // CLEAR 😄

  const clear = () => {

    setItems([]);

  };

  const total =
    items.reduce(

      (s, x) =>

        s +
        x.product.price * x.qty,

      0

    );

  const count =
    items.reduce(

      (s, x) =>

        s + x.qty,

      0

    );

  return (

    <CartContext.Provider

      value={{

        items,

        add,

        remove,

        setQty,

        clear,

        total,

        count,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export const useCart =
  () => useContext(CartContext);


// ---------- WISHLIST ----------

const WishCtx =
  createContext<{

    ids: string[];

    toggle: (
      id: string
    ) => void;

    has: (
      id: string
    ) => boolean;

  }>({

    ids: [],

    toggle: () => {},

    has: () => false,

  });

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {

const [ids, setIds] =
  useState<string[]>(() => {

    const saved =
      localStorage.getItem(
        "wish"
      );

    return saved
      ? JSON.parse(saved)
      : [];

});





  useEffect(() => {

    localStorage.setItem(

      "wish",

      JSON.stringify(ids)

    );

  }, [ids]);

  return (

    <WishCtx.Provider

      value={{

        ids,

        toggle: (id) =>

          setIds((prev) =>

            prev.includes(id)

              ? prev.filter(
                  (x) => x !== id
                )

              : [...prev, id]

          ),

        has: (id) =>

          ids.includes(id),

      }}

    >

      {children}

    </WishCtx.Provider>

  );

}

export const useWishlist =
  () => useContext(WishCtx);

  // ---------- COMMENTS ----------

const CommentsContext =
  createContext({});

export function CommentsProvider({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <CommentsContext.Provider
      value={{}}
    >

      {children}

    </CommentsContext.Provider>

  );

}

export const useComments =
  () => useContext(
    CommentsContext
  );