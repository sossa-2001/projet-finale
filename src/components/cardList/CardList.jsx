import React from "react"
import styles from "./cardList.module.css"
import Pagination from "../pagination/Pagination"
import Image from "next/image";
import Card from "../card/Card";

const CardList = async ({ page,cat }) =>{
const getData = async () => {
    
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store"
  });
        if(!res.ok)
        {
          throw new Error("Failed");
        }
        return res.json()
  };


  const {posts, count} = await getData(page,cat);
    const POST_PER_PAGE = 2;
    const hasPrev = POST_PER_PAGE * (page - 1) > 0 ;
    const hasNext = POST_PER_PAGE * (page - 1)  +  POST_PER_PAGE < count;
    // console.log(hasNext)
    // console.log(hasPrev)
    // console.log(page)
    return(
        <div className={styles.container} >
            <h1 className={styles.title}>Recent Posts </h1>
            <div className={styles.posts}>
            {/* {
            posts && Array.isArray(posts) && posts.map((item)=> (
              <Card item={item} key={item._id} />
             ))
            } */}
                 {
                posts && posts?.map((item) =>(
                <Card item={item} key={item._id} />
                ))}

                {/* <Card/>
                <Card/>
                <Card/> */}
            </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext = {hasNext} />
        </div>
    );
}

export default CardList