import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
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
            <div className="w-1/3 mx-auto my-9 bg-blue-100 p-6 rounded-md">
              <p className="text-xl font-bold text-center mb-6">
                Page Register
              </p>
              <Form>
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="border-2" />
                  <ErrorMessage
                    component="div"
                    name="name"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <Field type="text" name="username" className="border-2" />
                  <ErrorMessage
                    component="div"
                    name="username"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" className="border-2" />
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <Field type="text" name="phone" className="border-2" />
                  <ErrorMessage
                    component="div"
                    name="phone"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" className="border-2" />
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 py-2 px-3 rounded-md mt-10"
                >
                  Submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
