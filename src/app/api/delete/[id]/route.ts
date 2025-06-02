import { Url } from '@/models/urlModel/Url';
import { NextRequest, NextResponse} from 'next/server';

export async function DELETE(req : NextRequest , {params} : {params : {id : string}}){
    try{
            const id =  await params.id;
            const url = await Url.findOneAndDelete({_id: id});
        
            return NextResponse.json({message : "deleted url",url})
    }catch(error : unknown){
        console.log("error in delete route", error);
    }
}