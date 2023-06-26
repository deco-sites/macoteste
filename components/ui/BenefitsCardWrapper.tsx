

const BenefitsCardWrapper = ({children,link}:{children:HTMLElement,link:string})=>{

    return ( link?(<a href={link}> {children} </a>):( children )) 

}

export default BenefitsCardWrapper;
