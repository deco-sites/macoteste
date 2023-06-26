import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export type TextAlign = "Esquerda" | "Direita";

export const IMAGE_ALIGNMENT: Record<TextAlign, string> = {
  "Esquerda": "md:order-1",
  "Direita": "",
};

export interface Props {
    /**
     * @title Título
     */
  title?: string;
  /**
   * @title Corpo do texto
   * @format html
   */
  html?: string;
  /**
   * @title imagem
   */
  image: Imagem;
  /**
   * @title Alinhamento da imagem
   * @default Esquerda
   */
    imageAlign: TextAlign;
}

export interface Imagem {
    /** @description desktop otimized image */
    desktop?: LiveImage;
    /** @description mobile otimized image */
    mobile?: LiveImage;
    /**
     * @title Tamanho da imagem mobile
     */
    sizeMobile?: {
        /**
         * @title Altura
         */
        height: number;
        /**
         * @title Largura
         */
        width: number;
      };
    /**
     * @title Tamanho da imagem desktop
     */
    sizeDesktop?: {
        /**
         * @title Altura
         */
        height: number;
        /**
         * @title Largura
         */
        width: number;
    };
    /** @description Image's alt text */
    alt: string;
  }
export default function ImageAndtext( { html, title, imageAlign,image }: Props, ) {
    const someImage = image?.desktop ?? image?.mobile ?? ""
    return (
      <section class={`flex md:flex-row flex-col py-4 px-4 md:px-0 mx-auto gap-8 container w-full`}>
        <div class={`flex-1 self-center text-center ${IMAGE_ALIGNMENT[imageAlign ?? "Direita"]}`}>
            {title && <h3 class="text-secondary font-normal text-2xl mb-5">{title}</h3>}
            {html ? ( <div dangerouslySetInnerHTML={{ __html: html }}
                class="text-neutral font-normal text-sm max-w-5xl m-auto pb-12" />
            ) : null}
        </div>
        <div>
            {image && 
                <Picture preload={false}>
                    <Source
                        media="(max-width: 767px)"
                        fetchPriority={"auto"}
                        src={image.mobile ?? image.desktop ?? someImage}
                        width={image.sizeMobile?.width ?? 390}
                        height={image.sizeMobile?.height ?? 260}
                    />
                    <Source
                        media="(min-width: 768px)"
                        fetchPriority={"auto"}
                        src={image.desktop ?? image.mobile ?? someImage}
                        width={image.sizeDesktop?.width ?? 410}
                        height={image.sizeDesktop?.height ?? 410}
                    />

                    <img
                        class="h-auto m-auto"
                        loading={"lazy"}
                        src={image.desktop}
                        alt={image.alt}
                    />
                </Picture>}
        </div>
      </section>
    );
  }