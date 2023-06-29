import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
    page: LoaderReturnType<ProductDetailsPage>,
    specificationsToShow?: Specifications[] // array of strings with the specifications to show, e.g. ["Performance", "Tela", "Bateria", "Sensores", "Design"]
}

type Specifications = {
    specificationName: string,
    specificationTitle?: string,
};
function ProductSpecification({ page, specificationsToShow }: Props) {

    const additionalProperty = page?.product?.isVariantOf?.additionalProperty
    if (!specificationsToShow?.length || !additionalProperty?.length) return null;
    //regex to see if it is an url of an image
    const regex = new RegExp(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/g);
    return (
        <div class="mt-4 mb-6 sm:mb-4 sm:mt-8 px-4 sm:pr-0">
            <span class="text-sm">
                {page.product.description && (
                    <details open>
                        <summary class="cursor-pointer text-xl flex flex-row ">
                            <span class="align-start mr-auto">Especificações</span>
                            <Icon class="icon-open" id="ChevronDown" size={20} strokeWidth={3} />
                            <Icon class="icon-closed" id="ChevronUp" size={20} strokeWidth={3} />
                        </summary>
                        <div class="ml-2 mt-2 text- overflow-hidden mz-prod-summary text-justify" >
                            {specificationsToShow?.map(({ specificationName = "", specificationTitle }) => {
                               if(!specificationName) return <></>;
                                const specification = additionalProperty?.find(item => item.name?.toLocaleLowerCase() === specificationName?.toLocaleLowerCase())?.value
                                if (!specification) return <></>;
                                if( regex.test(specification) ) return (
                                    <div>
                                        <img src={specification} alt={specificationTitle} />
                                    </div>
                                )
                                return (
                                    <div className={"flex flex-col"} >
                                        {specificationTitle &&
                                        <div className="w-full md:pt-4 md:w-[40%]">
                                            <p class="text-primary font-bold">{specificationTitle}</p>
                                        </div>}
                                        <div class="flex flex-col">
                                            <p class={"flex-wrap break-words"} dangerouslySetInnerHTML={{ __html: specification }} > a</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </details>
                )}
            </span>
        </div>
    );
}

export default ProductSpecification;
