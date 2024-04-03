"use client";
import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { MdPerson } from "react-icons/md";
// import show from "../../../public/icon/show.png";
// import hide from "../../../public/icon/hide.png";
import IconInput from "@/components/IconInput";
function page() {
  const [censorPswd, setCensorPswd] = useState(true);
  const [formdata, setFormdata] = useState({
    User: "",
    Password: "",
  });

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

  function check(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const pswd = formData.get("Password");
    const user = formData.get("User");

    if (true) {
      alert("Invalid Login", "pswdcontainer");
    } else {
      //logic
    }
  }

  useEffect(() => {
    const handleClick = () => {
      window.location.href = "/auth/reset";
    };

    const element = document.getElementById("forgot");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setCensorPswd(!censorPswd);
    };

    const element = document.getElementById("toggle");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswd]);

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-[100svh] px-4">
        {/* <div className="font-poppins font-[700] text-[1.55rem] md:text-[1.8rem] xl:text-[2.0rem] text-white">
          Welcome Back
        </div>
        <div className="font-poppins font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-white mb-[30px] sm:mb-[40px] lg:mb-[50px]">
          Login
        </div> */}
        <div className="lg:py-14 lg:px-20 p-8 bg-black/80 rounded-lg lg:min-w-[750px]">
          <div className="flex flex-col items-center">
            <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
              Welcome Back
            </div>
            <div className="font-poppins text-[#7c818c] font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.5rem]   ">
              Login
            </div>
          </div>
          <form
            id="1"
            className="flex flex-col items-center justify-center pt-6"
            onSubmit={(e) => check(e)}
          >
            <div className="flex flex-col w-full gap-y-4">
              <div
                id="usercontainer"
                className=" flex flex-col items-center justify-center w-full"
              >
                <IconInput
                  type="text"
                  name="User"
                  placeholder="Email or Username"
                  value={formdata.User}
                  onChange={handleChange}
                  className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                  required
                >
                  <MdPerson />
                </IconInput>
              </div>
              <div id="pswdcontainer" className="w-full">
                <div className="flex flex-col items-center justify-center relative">
                  <IconInput
                    type={`${censorPswd ? "password" : "text"}`}
                    name="Password"
                    placeholder="Password"
                    value={formdata.Password}
                    onChange={handleChange}
                    className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                    required
                  >
                    {censorPswd && (
                      <IoMdEye id="toggle" className="cursor-pointer"></IoMdEye>
                    )}
                    {!censorPswd && (
                      <IoMdEyeOff
                        id="toggle"
                        className="cursor-pointer"
                      ></IoMdEyeOff>
                    )}
                  </IconInput>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-y-2 text-[0.95rem] md:text-[1rem]  text-[#7c818c] ">
              <div className="flex justify-center">
                <button type="submit" className="btn btn-outline">
                  Continue
                </button>
              </div>

              <div className="">
                Don't have an account?{" "}
                <a
                  href="/auth/signup"
                  className=" text-blue-400 hover:text-blue-300"
                >
                  Sign Up
                </a>
              </div>
              <button type="button" id="forgot" className="">
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default page;
