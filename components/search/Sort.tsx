import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const dictionary: any = {
    "relevance:desc": "Relevância",
    "price:desc": "Maior preço",
    "price:asc": "Menor preço",
    "orders:desc": "Mais vendidos",
    "name:desc": "De Z a A",
    "name:asc": "De A a Z",
    "release:desc": "Mais recentes",
    "discount:desc": "Descontos",
  };
  return (
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="w-min h-[36px] px-1 rounded m-2 text-base-content cursor-pointer outline-none"
    >
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value} selected={value === sort}>
          <span class="text-sm">
            {dictionary[label] ? dictionary[label] : label}
          </span>
        </option>
      ))}
    </select>
  );
}

export default Sort;
