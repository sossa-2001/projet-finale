import React from "react"
import styles from "./featured.module.css"
import Image from "next/image"

const Featured = () =>{
    return(
        <div className={styles.container} >
        <h1 className={styles.title}>
            <b className={styles.bold}>Hey, loma dev here!</b> Descover my stories and creative ideas.
            </h1>
            <div className={styles.post}>
                <div className={styles.imgContainer}>
                    <Image src="/p1.jpeg" className={styles.image} alt="" fill />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
                    <p className={styles.postDesc}>
                    Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
                    Cupiditate, quam nisi magni ca laborum inventore voluptatum
                    laudantium repellat ducimus unde aspernatur fuga.Quo, accusantium
                    quisquam! Harum unde site culpa debitis.
                    </p>
                    <button className={styles.button}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default Featured