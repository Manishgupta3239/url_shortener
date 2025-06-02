import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, SVGSVGElement } from "react";

export type urlType = {
    clicks :number,
    createdBy ?:string,
    createdAt?:Date,
    expiry?:Date,
    longUrl?:string,
    shortUrl?:string,
    _id ? :string
}


export type statsType = {
    title :string,
    value:number | string,
    change:string,
    color:string,
    bgColor:string,
    isLimited:boolean,
    percentage ?:number,
    isFeature?:boolean,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">> & RefAttributes<SVGSVGElement>;

}