import HTMLText, { TextAlign } from "./HTMLText.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface SeoTexts {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /**
   * @title Título
   * @default Título
   */
  title?: string;
  /**
   * @title Corpo do texto
   * @default Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
   * @format html
   */
  html?: string;
  /**
   * @title Alinhamento do texto no desktop
   * @default Centro
   */
  alignDesktop?: TextAlign;
  /**
   *  @title Alinhamento do texto no mobile
   * @default Centro
   */
  alignMobile?: TextAlign;
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  texts: SeoTexts[];
}

const SeoPLP = (props: Props) => {
  if (
    !props?.page?.breadcrumb?.itemListElement ||
    props?.page?.breadcrumb?.itemListElement?.length == 0
  ) return null;
  const { item: canonical } = props.page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = props.texts.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  return <HTMLText {...matching} />;
};

export default SeoPLP;
