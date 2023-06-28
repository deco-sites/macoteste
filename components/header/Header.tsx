import Modals from "$store/islands/HeaderModals.tsx";
import { useFreeShipping } from "$store/sdk/useFreeShipping.ts";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Icon {
  /**
   * @title Link name
   */
  label: string;
  /**
   * @title Link URL
   */
  href: string;
  /**
   * @title Icon
   * @description Icon to be displayed on the link
   */
  icon?: AvailableIcons;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Links menu
   * @description Links menu displayed on mobile menu
   */
  icons?: Icon[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
  /**
   * @title Valor do frete grátis
   * @description Deixar vazio caso não possua frete grátis
   */
  freeShipping?: number;
}

function Header(
  {
    searchbar: _searchbar,
    products,
    navItems = [],
    icons = [],
    suggestions,
    freeShipping,
  }: Props,
) {
  const freeShippingSignal = useFreeShipping();
  freeShippingSignal.value = freeShipping ? freeShipping : 0;

  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      {/* <div class="fixed top-[38px]"> */}
      <header style={{ height: headerHeight }}>
        <div class="bg-base-100 fixed w-full z-50">
          <div class="container  md:px-0 mx-auto">
            <Navbar items={navItems} searchbar={searchbar} />
          </div>
        </div>

        <Modals
          menu={{ items: navItems, icons }}
          searchbar={searchbar}
          freeShippingTarget={freeShippingSignal.value}
        />
      </header>
      {/* </div> */}
    </>
  );
}

export default Header;
