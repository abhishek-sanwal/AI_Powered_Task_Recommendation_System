import { Link, NavLink, useLocation } from "react-router-dom";
import { axiosTask, taskCreateEndpoint } from "../assets/endpoints";
import { useEffect, useState } from "react";

import ModalForm from "./Modal";
import Swal from "sweetalert2";

// 1 means 4px
function Navbar() {
  const location = useLocation();
  const [userId, setUserId] = useState();

  useEffect(function () {
    if (localStorage.getItem("userId")) {
      setUserId(JSON.parse(localStorage.getItem("userId")));
    }
  }, []);

  function createTask({ formData }) {
    axiosTask
      .post(
        taskCreateEndpoint,
        {
          ...formData,
          user_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        Swal.fire({
          icon: "success",
          text: "Created Successfully",
        })
      )
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "Some error occurred",
        });
      });
  }

  return (
    <section
      title="Navigation Bar"
      className="flex items-center justify-between py-4 font-medium "
    >
      <ModalForm buttonText={"Create a Task"} handleForm={createTask} />
      {/* Logo */}

      {/* Navigation Menu => By Default hidden, Visible on screens width >= 640px(SM) */}
      <nav>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink
            to="/home"
            className="flex flex-col gap-1 items-center uppercase "
          >
            <p>Dashboard</p>
            {/* Only active link should have horizontal line below it. Check app.css for styling of active link */}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/home"
            className="flex flex-col gap-1 items-center uppercase "
          >
            <p>Create Task</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/home"
            className="flex flex-col gap-1 items-center uppercase "
          >
            <p>Recommend Tasks</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
      </nav>
      {/*  */}

      {/* Menu icon only visible for width <= 640px */}
      {/* <img
      className="sm:hidden w-5 "
      src={assets.menu_icon}
      alt="Menu"
      role="button"
      onClick={() => setVisibleMenu(!visibleMenu)}
    /> */}
      {/* <MobileMenu
      dropdown_icon={assets.dropdown_icon}
      setVisibleMenu={setVisibleMenu}
      visibleMenu={visibleMenu}
    /> */}
    </section>
  );
}

export default Navbar;
