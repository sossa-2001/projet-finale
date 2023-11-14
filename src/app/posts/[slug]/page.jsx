import React from "react"
import styles from "./singlePage.module.css"
import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import Comments from "@/components/comments/Comments";


const SinglePage = async ({params}) =>{
const getData = async (slug) => {
    
    const res = await fetch(
        `http://localhost:3000/api/posts/${slug}`,{
        cache: "no-store"
      })
      if(!res.ok)
      {
        throw new Error("Failed");
      }
      return res.json()
};

    const {slug} = params;

    const data = await getData(slug)


    return(
        <div className={styles.container} >
           <div className={styles.infoContainer}>
           <div className={styles.textContainer}>
            <h1 className={styles.title}>
                {data[0]['title']} 
            </h1>
           <div className={styles.user}>
           <div className={styles.userImageContainer}>
           {
            data[0]['user']['image'] &&
            <Image src={data[0]['user']['image']} width={50} height={50} alt="" all  className={styles.avatar}/>}
           </div>
           <div className={styles.userTextContainer}>
            <span className={styles.username}>{data[0]['user']['name']}1</span><br />
            <span className={styles.date}>01.01.2024</span>
           </div>
           </div>

           </div>
           {data.image && 
           <div className={styles.imageContainer}>
            <Image src={data.image} alt="" width={650} height={350} all  className={styles.image}/>
           </div>
           }
           </div>
           <div className={styles.content}>
           <div className={styles.post}>
            
            <div className={styles.descriptiont}
             dangerouslySetInnerHTML={data[0]['desc'] ? { __html: data[0]['desc'] } : null}
             />
{/* 
<div className={styles.descriptiont}
             >{data.desc }</div> */}
           <div className={styles.comment}></div>
           <Comments  postSlug={slug}/>
           </div>
           <Menu/>
           </div>
        </div>
    );
}

export default SinglePage