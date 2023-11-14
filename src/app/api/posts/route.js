import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server"

export const GET = async (req) => {

    // const url = new URL(req.url);
    // const searchParams = url.searchParams;

    // // const { searchParams } = new URL(req.url);
    // const page = parseInt({searchParams}) || 1; // Page actuelle
    // // const page = searchParams.get("page");

    
    // // console.log(page);
    // const cat = searchParams.get("cat");
    const searchParams = new URLSearchParams(req.url.split('?')[1]); // Récupère les paramètres de l'URL
    const page = parseInt(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat");


    const POST_PER_PAGE = 2;
    const query={
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where:
        {
            catSlug: cat || undefined,
        }
                }

    try{
        const posts = await prisma.post.findMany({take: POST_PER_PAGE,
            skip: POST_PER_PAGE * (page - 1),
        });
        const count = await prisma.post.count();

        // const [posts, count] = await prisma.post.$transaction([
        //     prisma.post.findMany(query),
        //     prisma.post.count()
        // ]);
        return new NextResponse(JSON.stringify({posts,count},{status: 200}));
    }catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({message:"Something vent wrong!"},{status:500})
        );
    }
}


 // const [posts,count] = await prisma.$transaction([
        //     prisma.Post.findMany(query),
        //     prisma.Post.count({where:query.where}),
        //     ]);

// import { getAuthSession } from "@/utils/auth";
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


//create poste
export const POST = async (req) => {
    const session = await getAuthSession();
    console.log(session);

    if(!session){
        return new NextResponse(
            JSON.stringify({message:"Not Authenticated"},{status: 401})
        );
    }

    try{
        const body = await req.json();
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email },
        });
        return new NextResponse(JSON.stringify(post,{status: 200}));

    }catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({message:"Something vent wrong!"},{status:500})
        );
    }
}