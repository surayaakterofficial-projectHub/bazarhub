import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/payment-cancel"
)({
  component: PaymentCancel,
});

function PaymentCancel() {

  return (

    <div className="py-20 text-center">

      <h1 className="text-4xl font-bold text-yellow-500">

        Payment Cancelled ⚠️

      </h1>

    </div>

  );
}