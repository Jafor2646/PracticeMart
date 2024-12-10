import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { Link } from "react-router-dom";
import { loginFormControl } from "../../config/index";

const initialState = {
  email: "",
  password: "", 
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }
  //console.log(registerFormControl)
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      <CommonForm 
        formControl={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign In"
        onSubmit={onSubmit}
      />
    </div>
  );
}
export default AuthLogin;