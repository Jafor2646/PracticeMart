import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControl } from "../../config/index";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "", 
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast({ 
          title: data.payload.message,
        });
        navigate("/auth/login");
      }else{
        const err = data.error.message === "Request failed with status code 400" ? "Username or email is already in use." : data.error.message;
        toast({ 
          title: err,
          type: "error",
          variant: "destructive",
        });
      }
    });
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