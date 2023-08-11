"use client";
import { useGlobalContext } from "@/app/contex/store";
import "../app/globals.css";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter an email valid format")
    .required("Mandatory field"),
  password: yup
    .string()
    .min(8, "Password must be between 8-20 characters long")
    .max(20, "Password must be between 8-20 characters long")
    .required("Mandatory field"),
});

export default function Home(): JSX.Element {
  const { setLoggerUserId } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);

  const onLoginHandler = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/auth",
        values
      );
      const loggedUser = response.data.user;
      setLoggerUserId(loggedUser.id);
      setCookie("token", response.data.token, {
        path: "/",
        sameSite: true,
      });
      router.replace("/notes");
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col place-items-center min-h-screen">
      <h1 className="font-medium text-4xl mt-14">WELCOME TO noteTHIS</h1>

      {/* email and password for use while developing only - remove before final commit */}
      <h3 className="mt-6 mb-6 font-semibold text-2xl">default@mail.com</h3>
      <h3 className="mt-6 mb-6 font-semibold text-2xl">Default123</h3>
      {/* ----------------------------------------------------------------------------- */}

      <h3 className="mt-12 mb-6 font-semibold text-2xl">LOGIN</h3>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onLoginHandler}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col place-items-start w-full">
              <label
                htmlFor="email"
                className="font-inter font-medium text-lg text-grey-am mt-3"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`w-full h-12 rounded-lg px-2 mt-2 font-inter font-medium text-black focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                  errors.email && touched.email && "border-2 border-red-400"
                }`}
              />
              {errors.email && touched.email ? (
                <>
                  <div className="font-inter font-medium text-sm text-red-500 mt-1 -mb-8">
                    {errors.email}
                  </div>
                  <div className="self-end -mr-8">
                    <BiErrorCircle className="text-xl text-red-500 -mt-6" />
                  </div>
                </>
              ) : (
                <div className="h-4 mt-1 -mb-8"> </div>
              )}

              <label
                htmlFor="password"
                className="font-inter font-medium text-lg text-black mt-12"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type={!showPassword ? "password" : "text"}
                className={`w-full h-12 rounded-lg px-2 mt-2 pr-12 font-inter font-medium text-black-am focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                  errors.password &&
                  touched.password &&
                  "border-2 border-red-400"
                }`}
              />
              {!showPassword ? (
                <RiEyeOffLine
                  className="w-5 h-4 -mt-8 mr-5 text-black self-end"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              ) : (
                <RiEyeLine
                  className="w-5 h-4 -mt-8 mr-5 text-black self-end"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              )}
              {errors.password && touched.password && (
                <>
                  <div className="font-inter font-medium text-sm text-red-500 mt-5 -mb-9">
                    {errors.password}
                  </div>
                  <div className="h-7 self-end -mr-8 -mt-7">
                    <BiErrorCircle className="text-xl text-red-500 mt-2.5" />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="bg-green-400 text-white font-inter font-bold text-lg mt-14
                              w-28 h-11 rounded-lg self-center"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <h3 className="mt-16 mb-6 font-semibold text-2xl">Not registered?</h3>
      <button
        className="bg-blue-300 text-white font-inter font-bold text-lg
                  w-28 h-11 rounded-lg self-center"
        onClick={() => {
          router.push("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}
