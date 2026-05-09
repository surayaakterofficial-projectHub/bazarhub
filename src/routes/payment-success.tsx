import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/payment-success"
)({
  component: PaymentSuccess,
});

function PaymentSuccess() {

  return (

    <div className="py-20 text-center">

      <h1 className="text-4xl font-bold text-green-600">

        Payment Successful 🎉

      </h1>

    </div>

  );
}