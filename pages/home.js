import React, { useReducer } from "react";
import styles from "../styles/styles/index.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import CreatePost from "./CreatePost";
import UserLayout from "../src/components/User-Layout";
export default function MainHome() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

const viewPost = (id) => {
router.push(`/post/${id}`);
}
  
  const [render,RenderAgain] = useState(0);

 const reRender = () => {
    RenderAgain(render + 1);
    console.log('rendered');
 }

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // console.log(response.data);
      setPosts(response.data);
    });
    console.log(posts);
  }, [render]);

  return (
    <div className={styles.main_container}>
      <UserLayout/>
      <CreatePost reRender={reRender} />
      {posts.map((data, key) => {
        return (
          <div className={styles.post} key={key} onClick={()=>{viewPost(data.id)}}>
            <div className={styles.post__title}>{data.title}</div>
            <div className={styles.post__body}>{data.postText}</div>
            <div className={styles.post__footer}>- @{data.username}</div>
          </div>
        );
      })}
    </div>
  );
}
