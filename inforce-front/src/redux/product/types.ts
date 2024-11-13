import { CommentType } from "../comment/types";

export type ProductType = {
    id: number | undefined,
    imageUrl: string,
    name:string,
    count: number,
    size:{
        width:number,
        height:number
    },
    weight:string,
    comments: CommentType[]
}