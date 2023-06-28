import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;

  cardLayout?: {
    basics?: {
      contentAlignment?: "Left" | "Center";
      oldPriceSize?: "Small" | "Normal";
      ctaText?: string;
    };
    elementsPositions?: {
      skuSelector?: "Top" | "Bottom";
      favoriteIcon?: "Top right" | "Top left";
    };
    hide: {
      productName?: boolean;
      productDescription?: boolean;
      allPrices?: boolean;
      installments?: boolean;
      skuSelector?: boolean;
      cta?: boolean;
    };
    onMouseOver?: {
      image?: "Change image" | "Zoom image";
      showFavoriteIcon?: boolean;
      showSkuSelector?: boolean;
      showCardShadow?: boolean;
      showCta?: boolean;
    };
  };
}

function ProductGallery({ products, cardLayout }: Props) {
  return (
    <div class="grid grid-cols-2 gap-2 items-center sm:grid-cols-4 sm:gap-10">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          layout={cardLayout}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
