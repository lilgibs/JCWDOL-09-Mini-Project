import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const userToken = localStorage.getItem("user_token");

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format Email Salah")
      .required("Email Tidak Boleh Kosong"),
    password: Yup.string()
      .min(8, "Password Harus Lebih dari 8 karakter")
      .required("Password Tidak Boleh Kosong"),
  });

  const handleLoginUser = async (values) => {
    dispatch(loginUser(values))
  }

  useEffect(() => {
    if (userToken) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [localStorage.getItem("user_token")]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleLoginUser(values)
          }}
        >
          {(props) => {
            // console.log(props);
            return (
              <div className="w-1/3 mx-auto my-9 bg-blue-100 p-6 rounded-md">
                <p className="text-xl font-bold text-center mb-6">Page Login</p>
                <Form>
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

export default Login;
