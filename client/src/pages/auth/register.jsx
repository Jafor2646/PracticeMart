import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { Link } from "react-router-dom";
import { registerFormControl } from "../../config/index";

const initialState = {
  userName: "",
  email: "",
  password: "", 
};

function AuthRegister() {
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
        formControl={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign Up"
        onSubmit={onSubmit}
      />
    </div>
  );
}
export default AuthRegister;