import axios from "axios";
import { Form, Formik,Field } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles/index.module.css";
import * as Yup from 'yup';

export default function PostInfo() {
  const router = useRouter();
  const id = router.query.postID;

  const [post, setPostObjects] = useState({});
  const [comments, setComments] = useState([]);
  const [render, Update] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObjects(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [render]);

  const initialValues = {
    commentBody:"",
    PostId: id,
  }
  const validationSchema = Yup.object().shape({
    commentBody:Yup.string().required(),
  });

  const onSubmit = (data,{resetForm}) =>{
    axios.post('http://localhost:3001/comments/',data).then((response)=> {
      console.log('comment uploaded');
    })
   console.log(data);
      Update(render + 1);
      resetForm({values: ""});
  }

  return (
  <div>
    <button className={styles.post_btn__back} onClick={()=>{router.push('/')}} >Go Back</button>
     <div className={styles.post__container} >
     <div className={styles.post}>
      <div className={styles.post__title}>{post?.title}</div>
      <div className={styles.post__body}>{post?.postText}</div>
      <div className={styles.post__footer}>- @{post?.username}</div>
    </div>

   <div className={styles.post__comments} >
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}   >
      <Form autoComplete="off" >
        <Field className={styles.post__commentsMessage} name="commentBody" placeholder="Comment" as="textarea" />
        <button className={styles.post_btn__commentsUpload} type="submit" >Upload</button>
      </Form>
    </Formik>
    <h5>COMMENTS:</h5>
    <div>
      {comments.map((data)=>{
        return(
          <div className={styles.post__commentsContainer} >
            {data.commentBody}
         </div>
        )
      })}
    </div>
    </div>


   </div>
  </div>
  );
}
