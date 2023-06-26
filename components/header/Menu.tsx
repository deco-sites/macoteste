import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Icon {
    label: string;
    href: string;
    icon?: AvailableIcons;
}
export interface Props {
  items: INavItem[];
  icons?: Icon[]
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title">{item.label}</div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm" href={item.href}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items,icons }: Props) {
  return (
    <>
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200">
        {
          /* <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li> */
        }
        {icons?.map((icon) => (
            <li>
                <a class="flex items-center gap-4 px-4 py-2" href={icon.href} >
                    {icon.icon && <Icon id={icon.icon} width={20} height={20} strokeWidth={2} />}
                    <span class="text-sm">{icon.label}</span>
                </a>
            </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
