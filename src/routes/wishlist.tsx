import {
  createFileRoute,
  Link
} from "@tanstack/react-router";

import {
  FaHeart
} from "react-icons/fa";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useWishlist
} from "@/lib/store";

import {
  ProductCard
} from "@/components/ProductCard";

export const Route =
  createFileRoute("/wishlist")({

    component: WishlistPage,

  });

function WishlistPage() {

  const { ids } =
    useWishlist();

  const [products, setProducts] =
    useState([]);

  // LOAD PRODUCTS 😄

  useEffect(() => {

    axios
      .get(
        "https://bazarhub.onrender.com/products"
      )

      .then((res) => {

        setProducts(res.data);

      });

  }, []);

  // FILTER WISHLIST 😄

  const list =
    products.filter((p) =>

      ids.includes(p._id)

    );

  return (

    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4">

      <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">

        <FaHeart className="text-destructive" />

        My Wishlist ({list.length})

      </h1>

      {list.length === 0 ? (

        <div className="rounded-xl border border-border bg-card p-10 text-center">

          <p className="text-muted-foreground">

            Your wishlist is empty.

          </p>

          <Link
            to="/products"
            className="mt-3 inline-block rounded-md gradient-warm px-4 py-2 text-sm font-bold text-warm-foreground"
          >

            Browse Products

          </Link>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {list.map((p) => (

            <ProductCard
              key={p._id}
              product={p}
            />

          ))}

        </div>

      )}

    </div>

  );

}