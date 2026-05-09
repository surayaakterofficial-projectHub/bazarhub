import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";
export const Route = createFileRoute(
  "/admin"
)({
  component: AdminAddProduct,
});

function AdminAddProduct() {

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [refresh, setRefresh] =
    useState(false);

  // Load Products

  useEffect(() => {

    axios
      .get("http://localhost:5000/products")

      .then((res) => {

        setProducts(res.data);

      });

  }, [refresh]);

  // Add Product

  const handleAddProduct = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const productData = {

      name: form.name.value,

      image: form.image.value,

      category: form.category.value,

      price: Number(form.price.value),

      oldPrice: form.oldPrice.value
        ? Number(form.oldPrice.value)
        : null,

      rating: Number(form.rating.value),

      sold: Number(form.sold.value),

      description:
        form.description.value,

    };

    try {

      // UPDATE

      if (editingId) {

        const res =
          await axios.patch(

            `http://localhost:5000/products/${editingId}`,

            productData

          );

        if (res.data.modifiedCount > 0) {

          toast.success(
            "Product Updated"
          );

          setEditingId(null);

          setRefresh(!refresh);

          form.reset();

        }

      }

      // ADD

      else {

        const res =
          await axios.post(

            "http://localhost:5000/products",

            productData

          );

        if (res.data.insertedId) {

          toast.success(
            "Product Added Successfully"
          );

          form.reset();

          setRefresh(!refresh);

        }

      }

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

    finally {

      setLoading(false);

    }

  };

  // Delete Product

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this product?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await axios.delete(

            `http://localhost:5000/products/${id}`

          );

        if (res.data.deletedCount > 0) {

          toast.success(
            "Product Deleted"
          );

          setRefresh(!refresh);

        }

      }

      catch (err) {

        console.log(err);

      }

  };

  // Edit Product

  const handleEdit =
    (product) => {

      setEditingId(product._id);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      document.getElementsByName("name")[0].value =
        product.name;

      document.getElementsByName("image")[0].value =
        product.image;

      document.getElementsByName("category")[0].value =
        product.category;

      document.getElementsByName("price")[0].value =
        product.price;

      document.getElementsByName("oldPrice")[0].value =
        product.oldPrice || "";

      document.getElementsByName("rating")[0].value =
        product.rating;

      document.getElementsByName("sold")[0].value =
        product.sold;

      document.getElementsByName("description")[0].value =
        product.description;

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-10 px-4">

      <div className="mx-auto max-w-7xl space-y-10">

        {/* FORM */}

        <div className="rounded-3xl border border-border/50 bg-card/90 p-8 shadow-2xl">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-black text-primary">

                Admin Dashboard

              </h1>

              <p className="mt-2 text-sm text-muted-foreground">

                Add, Edit & Delete Products

              </p>

            </div>

          

<div
  className={`rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg

    ${
      editingId

        ? "bg-orange-500"

        : "bg-blue-700"

    }

  `}
>

  {
    editingId
      ? "Update Product"
      : "Add Product"
  }

</div>






          </div>

          <form
            onSubmit={handleAddProduct}
            className="space-y-6"
          >

            <input
              type="text"
              name="name"
              required
              placeholder="Product Name"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3"
            />

            <input
              type="text"
              name="image"
              required
              placeholder="Image URL"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3"
            />

            <select
              name="category"
              required
              className="w-full rounded-2xl border border-border bg-background px-4 py-3"
            >

              <option value="">
                Select Category
              </option>

              <option value="Grocery">
                Grocery
              </option>

              <option value="Restaurants">
                Restaurants
              </option>

              <option value="Mens">
                Men's Fashion
              </option>

              <option value="Womens">
                Women's Fashion
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Home">
                Home & Living
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Kids">
                Kids & Toys
              </option>

            </select>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="number"
                name="price"
                required
                placeholder="Price"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              />

              <input
                type="number"
                name="oldPrice"
                placeholder="Old Price"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              />

            </div>

            <div className="grid gap-5 md:grid-cols-2">
{/* rating dau
 */}
<select
  name="rating"
  required
  className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
>

  <option value="">
    Select Rating
  </option>

  <option value="5">
    ★★★★★ (5)
  </option>

  <option value="4.5">
    ★★★★☆ (4.5)
  </option>

  <option value="4">
    ★★★★☆ (4)
  </option>

  <option value="3.5">
    ★★★☆☆ (3.5)
  </option>

  <option value="3">
    ★★★☆☆ (3)
  </option>

</select>


              <input
                type="number"
                name="sold"
                required
                placeholder="Sold Count"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              />

            </div>

            <textarea
              name="description"
              rows={5}
              required
              placeholder="Description"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground"
            >

              {
                loading

                  ? "Loading..."

                  : editingId
                    ? "Update Product"
                    : "Add Product"
              }

            </button>

          </form>

        </div>

        {/* PRODUCT LIST */}

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-3xl font-black">

              All Products

            </h2>

            <span className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">

              {products.length} Products

            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <div
                key={product._id}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-md"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />

                <div className="space-y-3 p-4">

                  <h3 className="line-clamp-1 text-lg font-bold">

                    {product.name}

                  </h3>

                  <p className="text-sm text-muted-foreground">

                    {product.category}

                  </p>

                  <div className="flex items-center gap-3">

                    <span className="text-xl font-black text-primary">

                      ৳{product.price}

                    </span>

                    {product.oldPrice && (

                      <span className="text-sm text-muted-foreground line-through">

                        ৳{product.oldPrice}

                      </span>

                    )}

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="flex-1 rounded-xl bg-blue-400 px-4 py-2 text-sm font-bold text-primary-foreground"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="flex-1 rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}