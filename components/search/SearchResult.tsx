import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;

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

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  variant,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={variant === "drawer"}
        />

        <div class="flex flex-row">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow">
            <ProductGallery products={products} cardLayout={cardLayout} />
          </div>
        </div>
        {pageInfo.previousPage || pageInfo.nextPage
          ? (
            <div class="flex justify-center my-4">
              <div class="join">
                <a
                  aria-label="previous page link"
                  rel="prev"
                  href={pageInfo.previousPage}
                  class={`btn btn-ghost join-item ${
                    pageInfo.previousPage
                      ? ""
                      : "pointer-events-none opacity-10"
                  }`}
                >
                  <Icon
                    id="ChevronLeft"
                    width={20}
                    height={20}
                    strokeWidth={2}
                  />
                </a>

                <span class="btn btn-ghost join-item hover:bg-transparent bg-transparent">
                  Página {pageInfo.currentPage}

                  {pageInfo.records && pageInfo.recordPerPage
                    ? `/${Math.ceil(pageInfo.records / pageInfo.recordPerPage)}`
                    : null}
                </span>

                <a
                  aria-label="next page link"
                  rel="next"
                  href={pageInfo.nextPage}
                  class={`btn btn-ghost join-item ${
                    pageInfo.nextPage ? "" : "pointer-events-none opacity-10"
                  }`}
                >
                  <Icon
                    id="ChevronRight"
                    width={20}
                    height={20}
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          )
          : null}
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
