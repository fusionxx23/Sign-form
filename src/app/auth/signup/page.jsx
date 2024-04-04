"use client";
import React, { useEffect, useState } from "react";
import SignWrapper from "@/components/SignupWrapper";
import AlreadyAccount from "@/components/AlreadyAccount";
import IconInput from "@/components/IconInput";
import { MdEmail, MdPerson, MdPhone } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaS, FaStarOfLife } from "react-icons/fa6";
import SignupHeaders from "@/components/SignupHeaders";
import StepBtns from "@/components/StepBtns";
// import show from "../../../public/icon/show.png";
// import hide from "../../../public/icon/hide.png";

function page() {
  const [step, setStep] = useState(1);
  const [censorPswd, setCensorPswd] = useState(true);
  const [censorPswdCheck, setCensorPswdCheck] = useState(true);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [formdata, setFormdata] = useState({
    Email: "",
    Username: "",
    Password: "",
    Phone: "",
    emailotp: "",
    phoneotp: "",
    RePassword: "",
  });

  useEffect(() => {
    if (step != 2) return;

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
    if (step != 2) return;

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
    alertDiv.innerHTML = `<div class="text-light-1 mt-[1svh] text-[0.65rem] md:text-[0.9rem] text-red-400" id="alert">${alert}</div>`;
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
    if (!action && stage != "Email") {
      setStep(step - 1);
      alertClear();
    } else {
      formData = new FormData(e.target);
    }

    if (action && stage == "Email") {
      let Email = formData.get("Email");
      let Username = formData.get("Username");
      const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!EmailRegex.test(Email)) {
        alert("Invalid Email", "emailcontainer");
      } else if (Username.length < 6 || Username.length > 20) {
        alert("The Username Should Be 6-20 Characters", "usernamecontainer");
      } else if (!/^[a-zA-Z0-9]+$/.test(Username)) {
        alert("The Username Should Be Alphanumeric", "usernamecontainer");
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
        setEmailOTP("010101");
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Verify Email") {
      let OTP = formData.get("emailotp");

      if (OTP != emailOTP) {
        alert("Incorrect OTP", "emailotpcontainer");
      } else {
        alertClear();
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Phone") {
      const PhoneRegex = /^\+\d{5,19}$/;
      let Phone = formData.get("Phone");

      if (!PhoneRegex.test(Phone)) {
        alert("Invalid Phone; Example: +10001111222", "phonecontainer");
      } else {
        alertClear();
        setPhoneOTP("020202");
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Verify Phone") {
      let OTP = formData.get("phoneotp");

      if (OTP != phoneOTP) {
        alert("Incorrect OTP", "phoneotpcontainer");
      } else {
        alertClear();
        window.alert(
          formdata["Email"] +
            "\n" +
            formdata["Username"] +
            "\n" +
            formdata["Password"] +
            "\n" +
            formdata["Phone"]
        );
      }
    }
  }

  if (step == 1) {
    return (
      <SignWrapper>
        <SignupHeaders h2={"Step One"} />
        <form
          id="1"
          className=" pt-6"
          onSubmit={(e) => check(e, "Email", true)}
        >
          <div className="flex flex-col gap-y-4">
            <div id="emailcontainer" className="w-full">
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
              {/* <input
                 
                /> */}
            </div>
            <div id="usernamecontainer" className="w-full">
              <IconInput
                type="text"
                name="Username"
                placeholder="Username"
                value={formdata.Username}
                onChange={handleChange}
                required
              >
                <MdPerson />
              </IconInput>
              {/* <input /> */}
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-y-2">
            <button type="submit" className="btn btn-outline">
              Continue
            </button>

            <AlreadyAccount></AlreadyAccount>
          </div>
          {/* <div className="font-[600] text-white text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px]">
                Already have an account?{" "}
                <a href="/auth/signin" className="text-secondary-4-light">
                  Sign In
                </a>
              </div> */}
        </form>
      </SignWrapper>
    );
  } else if (step == 2) {
    return (
      <SignWrapper>
        {/* <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
              Create a Free Account
            </div>
            <div className="font-poppins font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-white mb-[30px] sm:mb-[40px] lg:mb-[50px]">
              Step Two
            </div> */}
        <SignupHeaders h1="Create a Free Account" h2="Step Two" />
        <form
          id="2"
          className="flex flex-col items-center justify-center pt-6"
          onSubmit={(e) => check(e, "Password", true)}
        >
          <div className="gap-y-4 flex flex-col w-full">
            <div id="passwordcontainer" className="w-full">
              <div className="w-full">
                <IconInput
                  type={`${censorPswd ? "password" : "text"}`}
                  name="Password"
                  placeholder="Password"
                  value={formdata.Password}
                  onChange={handleChange}
                  required
                >
                  {censorPswd && (
                    <IoMdEye id="censor" className="cursor-pointer"></IoMdEye>
                  )}
                  {!censorPswd && (
                    <IoMdEyeOff
                      id="censor"
                      className="cursor-pointer"
                    ></IoMdEyeOff>
                  )}
                </IconInput>

                <div
                  className="absolute right-0 cursor-pointer mr-2 text-[#7a7a7a]"
                  id="censor"
                ></div>
              </div>
            </div>

            <div id="repasswordcontainer" className="w-full">
              <div className="w-full">
                <IconInput
                  type={`${censorPswdCheck ? "password" : "text"}`}
                  name="RePassword"
                  placeholder="Retype Password"
                  value={formdata.RePassword}
                  onChange={handleChange}
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
                {/* <input
                    type={`${censorPswdCheck ? "password" : "text"}`}
                    name="RePassword"
                    placeholder="Retype Password"
                    value={formdata.RePassword}
                    onChange={handleChange}
                    className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                    required
                  /> */}
                <div
                  className="absolute right-0 cursor-pointer mr-2 text-[#7a7a7a]"
                  id="censorcheck"
                ></div>
              </div>
            </div>
          </div>

          <div className="pt-6 w-full flex flex-col gap-y-2">
            <StepBtns check={check} checkField="Password" />

            <div className="flex justify-center">
              <AlreadyAccount />
            </div>
          </div>
        </form>
      </SignWrapper>
    );
  } else if (step == 3) {
    return (
      <SignWrapper>
        <SignupHeaders
          h1={"Create a Free Account"}
          h2={"We just sent your email an OTP"}
        />

        <form
          id="3"
          className="flex flex-col items-center justify-center pt-6 w-full"
          onSubmit={(e) => check(e, "Verify Email", true)}
        >
          <div id="emailotpcontainer" className="w-full">
            <IconInput
              type="text"
              name="emailotp"
              placeholder="OTP: Email"
              value={formdata.emailotp}
              onChange={handleChange}
              // className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
              required
            >
              <FaStarOfLife size={11} />
            </IconInput>
            {/* <input /> */}
          </div>

          <div className="pt-6 w-full">
            <StepBtns check={check} checkField={"Verify Email"} />
            <div className="flex justify-center">
              <AlreadyAccount />
            </div>
          </div>
        </form>
      </SignWrapper>
    );
  } else if (step == 4) {
    return (
      <SignWrapper>
        <SignupHeaders h2={"Phone Number"} />
        <form
          id="4"
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => check(e, "Phone", true)}
        >
          <div id="phonecontainer" className="w-full pt-6">
            <IconInput
              type="text"
              name="Phone"
              value={formdata.Phone}
              onChange={handleChange}
              placeholder="Phone Number (+10001111222)"
              className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
              required
            >
              <MdPhone />
            </IconInput>
          </div>
          <div className="pt-6 w-full flex-col flex gap-y-2">
            <StepBtns check={check} checkField={"Phone"} />
            <div className="flex justify-center">
              <AlreadyAccount />
            </div>
          </div>
        </form>
      </SignWrapper>
    );
  } else if (step == 5) {
    return (
      <SignWrapper>
        <SignupHeaders
          h1={"Create a Free Account"}
          h2={"We just sent your phone an OTP"}
        />

        {/* <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
            Create a Free Account
          </div>
          <div className="font-poppins font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-white mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            We just sent your phone an OTP
          </div> */}
        <form
          id="5"
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => check(e, "Verify Phone", true)}
        >
          <div id="phoneotpcontainer" className="w-full pt-6">
            <IconInput
              type="text"
              name="phoneotp"
              placeholder="OTP: Phone"
              value={formdata.phoneotp}
              onChange={handleChange}
              // className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
              required
            >
              <FaStarOfLife size={11} />
            </IconInput>
          </div>
          <div className="pt-6 w-full flex flex-col gap-y-2">
            <StepBtns check={check} checkField={"Verify Phone"} />
            <div className="flex justify-center">
              <AlreadyAccount />
            </div>
          </div>
        </form>
      </SignWrapper>
    );
  }
}

export default page;
