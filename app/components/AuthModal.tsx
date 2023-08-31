"use client";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "black",
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const { error, loading, data } = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {  
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.city &&
        inputs.phone &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    }
    else {
      signup({ firstName:inputs.firstName,lastName:inputs.lastName,email: inputs.email, password: inputs.password,phone:inputs.phone,city:inputs.city}, handleClose);
    }
  };

  return (
    <div>
      {isSignin ? (
        <button
          className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
          onClick={handleOpen}
        >
          Sign in
        </button>
      ) : (
        <button
          className="border p-1 px-4 rounded text-black"
          onClick={handleOpen}
        >
          Sign up
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
            <CircularProgress disableShrink />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error? <Alert severity="error" className="mb-4">{error}</Alert>:null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {isSignin ? "Sign In" : "Create Account"}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSignin
                    ? "Log Into your account"
                    : "Create Your OpenTable Account"}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignin}
                />
                <div>
                  <button
                    className="upperCase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                    disabled={disabled}
                    onClick={handleClick}
                  >
                    {isSignin ? "Sign In" : "Create Account"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
