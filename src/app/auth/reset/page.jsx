"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconInput from "@/components/IconInput";
import AlreadyAccount from "@/components/AlreadyAccount";
import StepBtns from "@/components/StepBtns";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaS, FaStarOfLife } from "react-icons/fa6";
import { MdEmail, MdPerson, MdPhone } from "react-icons/md";
// import show from "../../../public/icon/show.png";
// import hide from "../../../public/icon/hide.png";

function page() {
  const [step, setStep] = useState(1);
  const [censorPswd, setCensorPswd] = useState(true);
  const [censorPswdCheck, setCensorPswdCheck] = useState(true);
  const [emailOTP, setEmailOTP] = useState("");
  const [formdata, setFormdata] = useState({
    Email: "",
    Username: "",
    Password: "",
    RePassword: "",
    otp: "",
  });

  useEffect(() => {
    if (step != 3) return;

    const handleClick = () => {
      setCensorPswd(!censorPswd);
    };

    const element = document.getElementById("censor");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswd, step]);

  useEffect(() => {
    if (step != 3) return;

    const handleClick = () => {
      setCensorPswdCheck(!censorPswdCheck);
    };

    const element = document.getElementById("censorcheck");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswdCheck, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  function alert(alert, field) {
    const formElement = document.getElementById(field);

    alertClear();

    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `<div class="text-light-1 mt-[1svh] text-[0.65rem] md:text-[1.0rem] text-red-200 pl-1" id="alert">${alert}</div>`;
    formElement.appendChild(alertDiv);
  }

  function alertClear() {
    const existingAlert = document.getElementById("alert");

    if (existingAlert) {
      existingAlert.remove();
    }
  }

  function check(e, stage, action) {
    e.preventDefault();
    let formData = null;
    if (!action && stage != "User") {
      setStep(step - 1);
    } else {
      formData = new FormData(e.target);
    }

    if (action && stage == "User") {
      let Email = formData.get("Email");
      let Username = formData.get("Username");

      if (false) {
        alert("Invalid Login", "usernamecontainer");
      } else {
        alertClear();
        setStep(step + 1);
        document.getElementById(step).reset();
        setEmailOTP("010101");
      }
    }

    if (action && stage == "OTP") {
      let OTP = formData.get("otp");

      if (OTP != emailOTP) {
        alert("Incorrect OTP", "otpcontainer");
      } else {
        alertClear();
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Password") {
      let Password = formData.get("Password");
      let Check = formData.get("RePassword");

      if (Password.length < 8 || Password.length > 20) {
        alert("The Password Should Be 8-20 Characters", "passwordcontainer");
      } else if (!Password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
        alert(
          "Password should contain at least one special character",
          "passwordcontainer"
        );
      } else if (!Password.match(/[A-Z]+/)) {
        alert(
          "Password should contain at least one uppercase letter",
          "passwordcontainer"
        );
      } else if (!Password.match(/[a-z]+/)) {
        alert(
          "Password should contain at least one lowercase letter",
          "passwordcontainer"
        );
      } else if (!Password.match(/[0-9]+/)) {
        alert(
          "Password should contain at least one number",
          "passwordcontainer"
        );
      } else if (Password != Check) {
        alert("Passwords don't match", "repasswordcontainer");
      } else {
        alertClear();
        window.alert(
          formdata["Email"] +
            "\n" +
            formdata["Username"] +
            "\n" +
            formdata["Password"] +
            "\n" +
            formdata["RePassword"]
        );
      }
    }
  }

  if (step == 1) {
    return (
      <ResetWrapper message="Credentials">
        <form
          id="1"
          className="flex flex-col items-center justify-center pt-6"
          onSubmit={(e) => check(e, "User", true)}
        >
          <div className="w-full flex flex-col gap-y-4">
            <div id="emailcontainer" className="w-full ">
              <IconInput
                type="text"
                name="Email"
                placeholder="Email"
                value={formdata.Email}
                onChange={handleChange}
                className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                required
              >
                <MdEmail />
              </IconInput>
            </div>
            <div id="usernamecontainer" className="w-full ">
              <IconInput
                type="text"
                name="Username"
                placeholder="Username"
                value={formdata.Username}
                onChange={handleChange}
                className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                required
              >
                <MdPerson />
              </IconInput>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-y-2">
            <button type="submit" className="btn btn-outline">
              Continue
            </button>

            <AlreadyAccount></AlreadyAccount>
          </div>
        </form>
      </ResetWrapper>
    );
  } else if (step == 2) {
    return (
      <ResetWrapper message="We just sent your email an OTP">
        <form
          id="1"
          className="flex flex-col items-center justify-center pt-6"
          onSubmit={(e) => check(e, "User", true)}
        >
          <div className="w-full flex flex-col gap-y-4">
            <div id="emailcontainer" className="w-full ">
              <IconInput
                type="text"
                name="otp"
                placeholder="OTP: Email"
                value={formdata.otp}
                onChange={handleChange}
                className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                required
              >
                <FaStarOfLife size={11} />
              </IconInput>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-y-2 w-full">
            {/* <button type="submit" className="btn btn-outline">
              Continue
            </button> */}
            <StepBtns check={check} checkField={"OTP"} />

            <AlreadyAccount></AlreadyAccount>
          </div>
        </form>
      </ResetWrapper>
    );
  } else if (step == 3) {
    return (
      <ResetWrapper>
        <form
          id="1"
          className="flex flex-col items-center justify-center pt-6"
          onSubmit={(e) => check(e, "User", true)}
        >
          <div className="w-full flex flex-col gap-y-4">
            <div id="passwordcontainer" className="w-full ">
              <IconInput
                type={`${censorPswd ? "password" : "text"}`}
                name="Password"
                placeholder="New Password"
                value={formdata.Password}
                onChange={handleChange}
                className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                required
              >
                {censorPswd && (
                  <IoMdEye
                    id="censorcheck"
                    className="cursor-pointer"
                  ></IoMdEye>
                )}
                {!censorPswd && (
                  <IoMdEyeOff
                    id="censorcheck"
                    className="cursor-pointer"
                  ></IoMdEyeOff>
                )}
              </IconInput>
            </div>

            <div id="repasswordcontainer" className="w-full ">
              <IconInput
                type={`${censorPswdCheck ? "password" : "text"}`}
                name="RePassword"
                placeholder="Retype New Password"
                value={formdata.RePassword}
                onChange={handleChange}
                className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                required
              >
                {censorPswdCheck && (
                  <IoMdEye
                    id="censorcheck"
                    className="cursor-pointer"
                  ></IoMdEye>
                )}
                {!censorPswdCheck && (
                  <IoMdEyeOff
                    id="censorcheck"
                    className="cursor-pointer"
                  ></IoMdEyeOff>
                )}
              </IconInput>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-y-2 w-full">
            {/* <button type="submit" className="btn btn-outline">
              Continue
            </button> */}
            <StepBtns check={check} checkField={"Password"} />

            <AlreadyAccount></AlreadyAccount>
          </div>
        </form>
      </ResetWrapper>
    );
  }
}

function ResetWrapper({ children, message }) {
  return (
    <main className="px-4">
      <div className="flex flex-col items-center justify-center h-[100svh]">
        <div className="p-8 bg-black/70 rounded-lg lg:min-w-[700px]">
          <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
            Reset Password<span className="text-blue-400">.</span>
          </div>
          <div
            className="font-poppins font-[500] text-[#7c818c]
              text-[1.3rem] md:text-[1.5rem] xl:text-[1.6rem]  "
          >
            {message}
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
export default page;
