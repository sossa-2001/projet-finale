import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server"


//affiche post
export const GET = async (req) => {

    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    try{
        const comments = await prisma.comment.findMany({
            where: {
                ...(postSlug && { postSlug } ),
            },
            include:{user:true},
        });
    return new NextResponse(JSON.stringify(comments,{status: 200}));

    }catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({message:"Something vent wrong!"},{status:500})
        );
    }

    
}






// // create poste
// export const POST = async (req) => {
//     const session = await getAuthSession();
//     console.log(session);
  
//     if (!session) {
//     //   console.log("Not Authenticated");
//       return new NextResponse(
//         JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
//       );
//     }
  
//     try {
//       const body = await req.json();
//       const comment = await prisma.comment.create({
//         data: { ...body, userEmail: session.user.email },
//       });
//       return new NextResponse(JSON.stringify(comment, { status: 200 }));
//     } catch (error) {
//       console.error(error); // Utilisez console.error pour afficher les erreurs
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//       );
//     }
//   };
  


//create poste
export const POST = async (req) => {
    const session = await getAuthSession();
    console.log('Session:', session);

    if(!session){
        return new NextResponse(
            JSON.stringify({message:"Not Authenticated"},{status: 401})
        );
    }

    try{
        const body = await req.json();
        // console.log('Body:', body);
        const comment = await prisma.comment.create({
            data: { ...body, userEmail: session.user.email },
        });
        return new NextResponse(JSON.stringify(comment,{status: 200}));

    }catch(error){
        // console.log(error)
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