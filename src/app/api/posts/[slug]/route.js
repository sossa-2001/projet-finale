import prisma from "@/utils/connect";
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {

    const {slug} = params

    try{


        // async function fetchPost(slug) {
            const post = await prisma.post.findMany({
              where: { slug }, 
            //   data:{views:{ increment: 1}},
              include: { user: true },
            });
        return new NextResponse(JSON.stringify(post,{status: 200}));

    }catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({message:"Something vent wrong!"},{status:500})
        );
    }
}




// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server"

// export const GET = async () => {
//     try{
//         const posts = await prisma.post.findMany();

//         return new NextResponse(JSON.stringify(posts,{status: 200}));

//     }catch(err){
//         console.log(err)
//         return new NextResponse(
//             JSON.stringify({message:"Something vent wrong!"},{status:500})
//         );
//     }
// }