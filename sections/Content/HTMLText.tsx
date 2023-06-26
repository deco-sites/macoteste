
export type TextAlign = "Esquerda" | "Direita" | "Centro";

export const TEXT_ALIGMENT_DESKTOP: Record<TextAlign, string> = {
  "Esquerda": "md:text-left",
  "Direita": "md:text-right",
  "Centro":"md:text-center",
};
export const TEXT_ALIGMENT_MOBILE: Record<TextAlign, string> = {
    "Esquerda": "text-left",
    "Direita": "text-right",
    "Centro":"text-center"
  };
  

export interface Props {
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
     * */
    alignMobile?: TextAlign;

}

export default function ImageAndtext( { html, title, alignDesktop,alignMobile }: Props, ) {
    return (
      <section class={`flex md:flex-row flex-col py-4 px-4 md:px-0 mx-auto gap-8 container w-full`}>
        <div class={`flex-1 self-center ${TEXT_ALIGMENT_MOBILE[alignMobile ?? "Centro"]} ${TEXT_ALIGMENT_DESKTOP[alignDesktop ?? "Centro"]} `}>
            {title && <h3 class="text-secondary font-normal text-2xl mb-5">{title}</h3>}
            {html ? ( <div dangerouslySetInnerHTML={{ __html: html }}
                class="text-neutral font-normal text-sm m-auto pb-12" />
            ) : null}
        </div>
      </section>
    );
  }