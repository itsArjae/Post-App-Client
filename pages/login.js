import React from "react";
import UserLayout from "../src/components/User-Layout";
import { Formik, Form, Field,ErrorMessage } from "formik";
import styles from "../styles/styles/index.module.css";
import * as Yup from 'yup';
import axios from "axios";
export default function Login() {

  const initialValues = {
    username:"",
    password:""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required(),
    password:Yup.string().min(6).max(20).required(),
  });

  const onSubmit = (data, {resetForm}) => {
    axios.post('http://localhost:3001/auth/login',data).then((response)=>{
      console.log(response);
    });
    resetForm({values:''});
  }

  return (
    <div className={styles.login} >
      <UserLayout />
      <div  className={styles.login__container}  >
        <h3>Login</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        <Form autoComplete="off" className={styles.login__form} >
          <Field
            name="username"
            placeholder="username"
            id={styles.login__input}
          />
          <ErrorMessage name="username" component="span" />
          <Field
            name="password"
            placeholder="password"
            type="password"
            id={styles.login__input}
          />
          <ErrorMessage name="password" component="span" />
          <button type="submit" className={styles.login__btn} > Login</button>
        </Form>
      </Formik>
      </div>
    </div>
  );
}
