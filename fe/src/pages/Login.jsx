import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const userToken = localStorage.getItem("user_token");

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format Email Salah")
      .required("Email Tidak Boleh Kosong"),
    password: Yup.string()
      .required("Password Tidak Boleh Kosong"),
  });

  const handleLoginUser = async (values) => {
    try {
      await dispatch(loginUser(values));
      setError(null);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error logging in");
      }
    }
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
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      
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
            <div className="w-1/3 mx-auto my-9 border p-6 rounded-sm shadow-md">
              <Form>
                <div className="flex flex-col py-3 items-center">
                  <div className="bg-slate-50 text-center p-3 rounded-md w-3/4 mb-10">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-5xl text-teal-400"
                    />
                    <p className="font-semibold text-teal-500 text-lg">User Login</p>
                  </div>
                  <div className="flex flex-col w-full mb-3">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <Field type="text" name="email" className="border rounded-sm py-1" />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-teal-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="password" className="font-semibold">Password</label>
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
                    Login
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

export default Login;
