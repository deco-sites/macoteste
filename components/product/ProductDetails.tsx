import { useId } from "preact/hooks";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatInstallments, formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

import { useSignal } from "@preact/signals";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";

import QuantityAddToCartButton from "../../islands/QuantityAddToCartButton.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  buyButtomText?: string;
  shippingText?: string;
}

const WIDTH = 650;
const HEIGHT = 650;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, buyButtomInnerText, shippingText }: {
    page: ProductDetailsPage;
    buyButtomInnerText: string;
    shippingText: string;
  },
) {
  const { breadcrumbList, product } = page;
  const { productID, offers, name, gtin } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
    "MCQ",
  );

  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          <span class="text-sm text-base-300">
            Cod. {gtin}
          </span>
        </div>
        <h1>
          <span class="font-medium text-xl">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <span class="line-through text-base-300 text-xs">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <span class="font-medium text-xl text-secondary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-sm text-base-300">
          {/* 8x de R$ 42.5 sem juros */}
          {formatInstallments(installments)}
        </span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <QuantityAddToCartButton
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                  variant={"primary"}
                  innerText={buyButtomInnerText}
                />
              )}
              {
                /* <WishlistButton
                variant="full"
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              /> */
              }
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
          shippingText={shippingText}
        />
      </div>
      {/* Description card */}
      {
        /* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </div>
            </details>
          )}
        </span>
      </div> */
      }
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
  buyButtomInnerText,
  shippingText,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  buyButtomInnerText: string;
  shippingText: string;
}) {
  const { breadcrumbList,product } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <div class="">
            {/* Breadcrumb */}
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement.slice(0, -1)} />
        <div
          id={id}
          class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full max-w-[650px]"
                    sizes="(max-width: 650px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
              disabled
            >
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
              disabled={images.length < 2}
            >
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <ProductImageZoom
                images={images}
                width={1280}
                height={1280 * HEIGHT / WIDTH}
              />
            </div>
          </div>

          {/* Dots Desktop*/}
          <ul class="hidden sm:flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1 max-h-[32rem]">
            {images.map((img, index) => (
              <li class="min-w-[63px] sm:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded "
                    width={63}
                    height={63}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
          {/* Dots Mobile*/}
            <ul class="sm:hidden flex gap-3 justify-center overflow-auto px-4">
                {images.map((img, index) => (
                    <li>
                        <Slider.Dot isMobile={true} index={index}>
                            <div class="w-3 h-3 group-disabled:bg-primary duration-150 bg-base-200 rounded-full"></div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
            <ProductInfo
              page={page}
              buyButtomInnerText={buyButtomInnerText}
              shippingText={shippingText}
            />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>

        <div class="mt-4 mb-6 sm:mb-4 sm:mt-8 px-4 sm:pr-0">
          <span class="text-sm">
            {page.product.description && (
              <details open>
                <summary class="cursor-pointer text-xl flex flex-row ">
                    <span class="align-start mr-auto">Descrição</span>
                    <Icon class="icon-open" id="ChevronDown" size={20} strokeWidth={3} />
                    <Icon class="icon-closed"id="ChevronUp" size={20} strokeWidth={3} />
                </summary>
                <div
                  class="ml-2 mt-2 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: page.product.description }}
                >
                </div>
              </details>
            )}
          </span>
        </div>
      </div>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo
          page={page}
          buyButtomInnerText={buyButtomInnerText}
          shippingText={shippingText}
        />
      </div>
    </div>
  );
}

function ProductDetails( { page, variant: maybeVar = "auto", buyButtomText = "Adicionar à Sacola", shippingText = "Calcular Frete", }: Props, ) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? 
      ( <Details page={page} variant={variant} buyButtomInnerText={buyButtomText} shippingText={shippingText} /> ) : 
      <NotFound />}
    </div>
  );
}

export default ProductDetails;
