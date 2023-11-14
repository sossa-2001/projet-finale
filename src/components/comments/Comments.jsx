"use client"

import React, { useState } from "react"
import styles from "./comments.module.css"
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr"
import { useSession } from "next-auth/react";




const fetcher = async (url) =>{
    const res = await fetch(url)
    console.log(res)
    const data = await res.json();
    
    if(!res.ok){
        const error = new Error(data.message);
        throw error;
    }
    return data;
};

const Comments = ({ postSlug }) =>{

    // console.log(postSlug)

    const {status} = useSession();

    const { data, mutate ,isLoading } = useSWR(
        `http://localhost:3000/api/comments?postSlug=${postSlug}`,
         fetcher
         );
    const [desc,setDesc] = useState("");
// console.log(useState(""))


    const handleSubmit = async () =>{
        await fetch("/api/comments",{
            method: "POST",
            body: JSON.stringify({ desc,postSlug }),
        });
        mutate();
    };
    // console.log(handleSubmit);

    return(
        <div className={styles.container} >
            <h1 className={styles.title}>Comments</h1>
        { "authenticated"  ===  "authenticated" 
        
        ? (
        <div className={styles.write}>
            <textarea 
            placeholder="write a comment..." 
            className={styles.input} 
            onChange={(e) => setDesc(e.target.value)} 
            />
            <button className={styles.button} onClick={handleSubmit} >Send</button>
        </div>
        ) : (
        <Link href="/login" >Login to write a comment</Link>
        )}
         <div className={styles.comments} >
        {isLoading 
        ? "loading" 
         : data?.map((item) =>( 
            

        <div className={styles.comment}  key={item._id}>
        <div className={styles.user}>
           {
           item.user.image && 
            <Image src={item.user.image} width={50}  height={50} 
            className={styles.image} />
            
            }
            <div className={styles.userInfo}>
                <span className={styles.username}>{item.user.name}</span>
                <span className={styles.date}>{item.createdAt}</span>
            </div>
        </div>
            <p className={styles.desc} >
            {item.desc}
            </p>
        </div>
        ) ) }


      </div>   
       </div>  
    );
};

export default Comments