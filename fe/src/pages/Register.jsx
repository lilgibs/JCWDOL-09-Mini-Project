import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { useDispatch } from "react-redux";

function Register() {


  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Nama tidak boleh kosong"),
    username: Yup.string().required("Username tidak boleh kosong"),
    email: Yup.string()
      .email("Format email salah")
      .required("Email tidak boleh kosong"),
    phone: Yup.string().required("Nomor tidak boleh kosong"),
    password: Yup.string()
      .min(8, "Password haris lebih dari 8 karakter")
      .required("Password tidak boleh kosong"),
  });

  const registerUser = async (values) => {
    try {
      // console.log(values)
      const response = await axios.post('http://localhost:5500/auth/register', values)
      console.log(response.data)
      alert(response.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          name: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          registerUser(values)
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <div className="w-1/3 mx-auto my-9 border p-6 rounded-sm shadow-md">
              <Form>
                <div className="flex flex-col py-3 items-center">
                  <div className="bg-slate-50 text-center p-3 rounded-md w-3/4 mb-10">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-5xl text-teal-400"
                    />
                    <p className="font-semibold text-teal-500 text-lg">User Register</p>
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <Field type="text" name="name" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="username" className='font-semibold'>Username</label>
                    <Field type="text" name="username" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <Field type="text" name="email" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="phone" className='font-semibold'>Phone</label>
                    <Field type="text" name="phone" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <Field type="password" name="password" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-teal-400 py-2 px-3 rounded-sm w-full mt-10 text-white font-semibold"
                  >
                    Register
                  </button>
                </div>

              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
