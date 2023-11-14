import React from "react"
import styles from "./blogPage.module.css"
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

const BlogPage = ({searchParams}) =>{
    const { page } = { page: parseInt(searchParams.page) || 1 };
    // console.log(page);
    const { cat } = searchParams;
    return(
        <div className={styles.container} >
           <h1 className={styles.title}>Cat Blog</h1>
           <div className={styles.content}>
            <CardList page ={page} cat = {cat} />
            <Menu/>
           </div>
        </div>
    );
}

export default BlogPage