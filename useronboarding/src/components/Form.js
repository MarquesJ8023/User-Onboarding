import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


    const UserForm = ({ errors, touched, values, isSubmitting, status }) => {
            const [
                user, 
                setUser
            ] = useState([]);
            useEffect(() => {
              if(status){
                setUser ([...user, status])};
            }, [status]);
                  

            return (
                <div className="user-form">
              <h1>User Form</h1>
              <Form>
      
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
        
                <Field type="text" className="email" placeholder="Email" name="email">
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                </Field>
        
                <label className="checkbox-container">
                  Terms Of Service
                  <Field
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                  />
                  <span className="checkmark" />
                </label>
        
                <Field
                  type="text"
                  name="password"
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <p className="error">{errors.password}</p>
                )}
        
                <button type="submit">Submit!</button>
              </Form>
                  <div>
                      {user.map(u => {
                      return <p 
                      key={u.name}> {u.email} {u.password}</p>
                        })}
                  </div>
            </div>
          );
                };

      const FormikUserForm = withFormik({
        mapPropsToValues({ name, email, password, TOS, submit }) {
          return {
            name: name || '',
            email: email || '',
            password: password || '',
            TOS: TOS || '',
            submit: submit || ''
          };
        },
      
        validationSchema: Yup.object().shape({
          Name: Yup.string().required(),
          email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
          password: Yup.string()
            .min(3, "Password must be 3 characters or longer")
            .required("Password is required")
        }),
      
        handleSubmit(values,{setStatus}) {
          axios
            .post('https://reqres.in/api/users', values)
            .then(res => { 
              console.log(res)
              setStatus(res.data);
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      })(UserForm);
      
export default FormikUserForm;
