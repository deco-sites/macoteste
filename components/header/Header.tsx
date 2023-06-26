import Modals from "$store/islands/HeaderModals.tsx";
import { useFreeShipping } from "$store/sdk/useFreeShipping.ts";
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

function Header({ alerts, searchbar: _searchbar, products, navItems = [], suggestions, freeShipping}: Props) {
    const freeShippingSignal = useFreeShipping();
    freeShippingSignal.value = freeShipping ? freeShipping : 0;
    
    const searchbar = { ..._searchbar, products, suggestions };
    return (
        <>
            <header style={{ height: headerHeight }}>
                <div class="bg-base-100 fixed w-full z-50">
                    <Alert alerts={alerts} />
                    <Navbar items={navItems} searchbar={searchbar} />
                </div>

                <Modals menu={{ items: navItems }} searchbar={searchbar} freeShippingTarget={freeShippingSignal.value} />
            </header>
        </>
    );
}

export default Header;
