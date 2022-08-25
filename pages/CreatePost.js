import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import styles from "../styles/styles/index.module.css";
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/router";
export default function CreatePost(props) {

  const router = useRouter();
  const {id} = router.query;
const name = 2;
  const route = () => {
    router.p
  }
  const {reRender} = props;
  const initialValues = {
    title:"",
    postText:"",
    username:"",
  }
  const onSubmit = (data, {resetForm}) => {
    axios.post("http://localhost:3001/posts",data).then((response)=>{
    console.log("It worked");
    });
    console.log(data);
    resetForm({values:''});
    reRender();
  };
  const validationSchema = Yup.object().shape({
    title:Yup.string().required(),
    postText:Yup.string().required() ,
    username:Yup.string().min(3).max(15).required()
  });

  return (
    <div className={styles.CreatePost__Container}  >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        <Form autoComplete="off" className={styles.createPost_form}> 
          <Field  id={styles.createPost__inputTitle} name="title" placeholder="Title:" />
          <ErrorMessage name="title" component="span" /> 
          <Field id={styles.createPost__inputMessage} name="postText" placeholder="Message:" as="textarea" />
          <ErrorMessage name="postText" component="span" /> 
          <Field id={styles.createPost__inputUsername} name="username" placeholder="Username:" />
          <ErrorMessage name="username" component="span" /> 
          <button type="submit" style={{cursor:'pointer'}} >Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}
