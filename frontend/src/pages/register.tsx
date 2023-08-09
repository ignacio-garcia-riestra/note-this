import "../app/globals.css";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import router, { useRouter } from "next/router";
import { BiErrorCircle } from "react-icons/bi";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toMatchPassword, setToMatchPassword] = useState("");
  const router = useRouter();

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .min(2, "At least 2 characters long")
      .matches(/^[aA-zZ\s]+$/, "Only letters are allowed in this field")
      .required("Mandatory field"),
    lastname: yup
      .string()
      .min(2, "At least 2 characters long")
      .matches(/^[aA-zZ\s]+$/, "Only letters are allowed in this field")
      .required("Mandatory field"),
    email: yup
      .string()
      .email("Enter an email valid format")
      .required("Mandatory field"),
    password: yup
      .string()
      .min(8, "8-20 characters long")
      .max(20, "8-20 characters long")
      .required("Mandatory field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords don't match")
      .required("Mandatory field"),
  });

  const onRegisterHandler = async (values: any) => {
    try {
      await axios.post("http://localhost:5000/api/users/register", values);
      alert("Successfully registered");
      router.push("/");
    } catch (error: any) {
      alert(error.response.data.error.errors[0].message);
    }
  };

  return (
    <div className="flex flex-col place-items-center min-h-screen">
      <h1 className="font-medium text-4xl mt-14">WELCOME TO noteTHIS</h1>
      <h3 className="mt-12 mb-6 font-semibold text-2xl">CREATE AN ACCOUNT</h3>
      <div>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onRegisterHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col place-items-start w-full">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 mx-12">
                  <label
                    htmlFor="firstname"
                    className="font-inter font-medium text-lg text-grey-am mt-3"
                  >
                    First name
                  </label>
                  <Field
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    className={`w-full h-12 rounded-lg px-2 mt-2 font-inter font-medium text-black focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                      errors.firstname &&
                      touched.firstname &&
                      "border-2 border-red-400"
                    }`}
                  />
                  {errors.firstname && touched.firstname ? (
                    <>
                      <div className="font-inter font-medium text-sm text-red-500 mt-1 -mb-10">
                        {errors.firstname}
                      </div>
                      <div className="self-end -mr-8">
                        <BiErrorCircle className="text-xl text-red-500 -mt-4" />
                      </div>
                    </>
                  ) : (
                    <div className="h-4 mt-1 -mb-8"> </div>
                  )}
                </div>

                <div className="flex flex-col w-1/2 mx-12">
                  <label
                    htmlFor="password"
                    className="font-inter font-medium text-lg text-black mt-3"
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
                </div>
              </div>

              <div className="flex flex-row w-full mt-9">
                <div className="flex flex-col w-1/2 mx-12">
                  <label
                    htmlFor="lastname"
                    className="font-inter font-medium text-lg text-grey-am mt-3"
                  >
                    Last name
                  </label>
                  <Field
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    className={`w-full h-12 rounded-lg px-2 mt-2 font-inter font-medium text-black focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                      errors.lastname &&
                      touched.lastname &&
                      "border-2 border-red-400"
                    }`}
                  />
                  {errors.lastname && touched.lastname ? (
                    <>
                      <div className="font-inter font-medium text-sm text-red-500 mt-1 -mb-9">
                        {errors.lastname}
                      </div>
                      <div className="self-end -mr-8">
                        <BiErrorCircle className="text-xl text-red-500 -mt-5" />
                      </div>
                    </>
                  ) : (
                    <div className="h-4 mt-1 -mb-8"> </div>
                  )}
                </div>

                <div className="flex flex-col w-1/2 mx-12">
                  <label
                    htmlFor="confirmPassword"
                    className="font-inter font-medium text-lg text-black mt-3"
                  >
                    Confirm password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={!showConfirmPassword ? "password" : "text"}
                    className={`w-full h-12 rounded-lg px-2 mt-2 pr-12 font-inter font-medium text-black-am focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      "border-2 border-red-400"
                    }`}
                  />
                  {!showConfirmPassword ? (
                    <RiEyeOffLine
                      className="w-5 h-4 -mt-8 mr-5 text-black self-end"
                      onClick={() =>
                        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                      }
                    />
                  ) : (
                    <RiEyeLine
                      className="w-5 h-4 -mt-8 mr-5 text-black self-end"
                      onClick={() =>
                        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                      }
                    />
                  )}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <>
                      <div className="font-inter font-medium text-sm text-red-500 mt-5 -mb-9">
                        {errors.confirmPassword}
                      </div>
                      <div className="h-7 self-end -mr-8 -mt-7">
                        <BiErrorCircle className="text-xl text-red-500 mt-2.5" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-full mt-9">
                <div className="flex flex-col w-1/2 mx-12">
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
                </div>

                <div className="flex flex-col w-1/2 mx-12 justify-end">
                  <button
                    type="submit"
                    className="bg-green-400 text-white font-inter font-bold text-lg
                              w-28 h-11 rounded-lg self-end -mb-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <h3 className="mt-16 mb-6 font-semibold text-2xl">
        Already have an account?
      </h3>
      <button
        className="bg-blue-300 text-white font-inter font-bold text-lg
                  w-28 h-11 rounded-lg self-center"
        onClick={() => {
          router.push("/");
        }}
      >
        Login
      </button>
    </div>
  );
}
