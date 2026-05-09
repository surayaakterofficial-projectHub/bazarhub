import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/payment-fail"
)({
  component: PaymentFail,
});

function PaymentFail() {

  return (

    <div className="py-20 text-center">

      <h1 className="text-4xl font-bold text-red-600">

        Payment Failed ❌

      </h1>

    </div>

  );
}