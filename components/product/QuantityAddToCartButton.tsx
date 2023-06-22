import { Options as UseAddToCartProps } from "$store/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  innerText?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary";
}

function QuantityAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    innerText,
  }: Props,
) {
  const quantity = useSignal(1);

  return (
    <div class="flex w-full gap-2 flex-wrap ">
      <QuantitySelector
        disabled={price === 0}
        quantity={quantity.value}
        onChange={(newQuantity) => {
          console.log("quantity");
          quantity.value = newQuantity;
        }}
      />
      <AddToCartButton
        skuId={skuId}
        sellerId={sellerId}
        price={price ?? 0}
        discount={discount}
        name={name}
        productGroupId={productGroupId}
        quantity={quantity.value}
        innerText={innerText ? innerText : "Adicionar à Sacola"}
      />
    </div>
  );
}

export default QuantityAddToCartButton;
