import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description Adicione um link
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  description?: string;
  /**
   * @maxItems 4
   * @minItems 4
   */
  /** @description Add 4 images */
  banners?: Banner[];
  /** @description Set sizes in px to not crop images if they don't match their container size */
  imagesSizes?: {
    mobile?: {
      largerImage: {
        height: number;
        width: number;
      }
      smallerImage: {
        height: number;
        width: number;
      };
    }
    desktop?: {
      largerImage: {
        height: number;
        width: number;
      }
      smallerImage: {
        height: number;
        width: number;
      };
    }
  }
  layout?: {
    /**
     * @description Aplique borda a sua imagem
     */
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    headerAlignment?: "center" | "left";
    autosizeMobile?: "Asymmetric" | "Symmetrical";
    autosizeDesktop?: "Asymmetric" | "Symmetrical";
  };
}

const RADIUS: Record<string, Record<BorderRadius, string>> = {
  mobile: {
    "none": "rounded-none",
    "sm": "rounded-sm",
    "md": "rounded-md",
    "lg": "rounded-lg",
    "xl": "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    "full": "rounded-full",
  },
  desktop: {
    "none": "sm:rounded-none",
    "sm": "sm:rounded-sm",
    "md": "sm:rounded-md",
    "lg": "sm:rounded-lg",
    "xl": "sm:rounded-xl",
    "2xl": "sm:rounded-2xl",
    "3xl": "sm:rounded-3xl",
    "full": "sm:rounded-full",
  },
};

const DEFAULT_PROPS: Props = {
  "banners": [
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/4b5b4797-8728-483f-a7af-f775b0afb01a",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/a8ba1db7-3e23-47e5-83ac-43dfbd2413fd",
      "alt": "capi",
      "href": "/capibara",
    },
    {
      "alt": "Capybara",
      "href": "https://en.wikipedia.org/wiki/Capybara",
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cabc6f7d-7f9b-4f37-9ed7-3ebe840f4087",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/9704ea7e-1810-4f3c-bd17-00e755022e57",
    },
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3ec93523-7b64-4c23-987a-410e59e86471",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/18e739cc-31d3-4e5a-9d24-abd4a39697c2",
      "href": "https://en.wikipedia.org/wiki/Capybara",
      "alt": "Capybara",
    },
    {
      "srcMobile":
        "https://ik.imagekit.io/decocx/tr:w-1280,h-800/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1542/c218539d-aad8-474e-b0d5-ae9dd59fdd41",
      "srcDesktop":
        "https://ik.imagekit.io/decocx/tr:w-1280,h-800/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1542/c218539d-aad8-474e-b0d5-ae9dd59fdd41",
      "alt": "Capybara",
      "href": "https://en.wikipedia.org/wiki/Capybara",
    },
  ],
  "layout": {
    "borderRadius": {
      "mobile": "3xl",
      "desktop": "2xl",
    },
    "headerAlignment": "center",
    "autosizeMobile": "Asymmetric",
    "autosizeDesktop": "Asymmetric",
  },
};

function Banner(
  props: Banner & {
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    type: string;
    sizeMobile?: {
      height: number;
      width: number;
    };
    sizeDesktop?: {
      height: number;
      width: number;
    };
    mobile: string;
    desktop: string;
  },
) {
  const { borderRadius, srcMobile, srcDesktop, alt } = props;
  const radiusDesktop = RADIUS.desktop[borderRadius?.desktop ?? "none"];
  const radiusMobile = RADIUS.mobile[borderRadius?.desktop ?? "none"];

  return (
    <a
      href={props.href}
      class={`overflow-hidden ${radiusDesktop} ${radiusMobile}`}
    >
      <Picture>
        <Source
          width={props.sizeMobile ? props.sizeMobile.width : 400}
          height={props.sizeMobile ? props.sizeMobile.height : props.type === "large" ? 400 : props.mobile == "Symmetrical" ? 400 : 220}
          media="(max-width: 767px)"
          src={srcMobile}
        />
        <Source
          width={props.sizeDesktop ? props.sizeDesktop.width : 640}
          height={props.sizeDesktop ? props.sizeDesktop.height : props.type === "large" ? 640 : props.desktop == "Symmetrical" ? 640 : 400}
          media="(min-width: 768px)"
          src={srcDesktop || srcMobile}
        />
        <img
          class={`w-full object-cover"}`}
          src={srcMobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}

export default function Gallery(props: Props) {
  const { title, description, banners, imagesSizes, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <section class="container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />
      <div class="flex gap-4 flex-col md:flex-row">
        <div class="flex flex-col gap-4 w-full md:w-1/2">
          {banners?.map((banner, index) => (
            <>
              {
                index < 2 && (
                  <Banner
                    {...banner}
                    borderRadius={props.layout?.borderRadius}
                    type={index % 2 == 0 ? "large" : "small"}
                    sizeMobile={index % 2 == 0 ? imagesSizes?.mobile?.largerImage : imagesSizes?.mobile?.smallerImage}
                    sizeDesktop={index % 2 == 0 ? imagesSizes?.desktop?.largerImage : imagesSizes?.desktop?.smallerImage}
                    mobile={layout?.autosizeMobile || "Asymmetric"}
                    desktop={layout?.autosizeDesktop || "Asymmetric"}
                  />
                )
              }
            </>
          ))}
        </div>
        <div class="flex flex-col gap-4 w-full md:w-1/2">
          {banners?.map((banner, index) => (
            <>
              {
                index >= 2 && (

                  <Banner
                    {...banner}
                    borderRadius={props.layout?.borderRadius}
                    type={index % 2 != 0 ? "large" : "small"}
                    sizeMobile={index % 2 != 0 ? imagesSizes?.mobile?.largerImage : imagesSizes?.mobile?.smallerImage}
                    sizeDesktop={index % 2 != 0 ? imagesSizes?.desktop?.largerImage : imagesSizes?.desktop?.smallerImage}
                    mobile={layout?.autosizeMobile || "Asymmetric"}
                    desktop={layout?.autosizeDesktop || "Asymmetric"}
                  />
                )
              }
            </>
          ))}
        </div>

      </div>
    </section>
  );
}