import {
  axiosTask,
  taskCreateEndpoint,
  taskDeleteEndpoint,
  taskUpdateEndpoint,
} from "../assets/endpoints";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ModalForm from "../components/Modal";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { taskListEndpoint } from "../assets/endpoints";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [tasks, setTasks] = useState();
  useEffect(function () {
    const user = localStorage.getItem("userId");
    console.log(user);
    if (!user) navigate("/login");
    setUserId(user);
  }, []);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(userId); // Debugging line
        if (userId) {
          const response = await axiosTask.get(`${taskListEndpoint}/${userId}`);
          setTasks(response.data); // Ensure `setTasks` is properly defined in your component
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Call the function inside useEffect
  }, [userId]);

  function Logout() {
    localStorage.removeItem("userId");
    navigate("login/");
  }

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

  function updateTask({ formData }) {
    axiosTask
      .put(
        taskUpdateEndpoint,
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
      .catch(
        Swal.fire({
          icon: "error",
          text: "Some error occurred",
        })
      );
  }

  function deleteTask(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosTask
          .delete(taskDeleteEndpoint + id, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Task deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "An Error Occured!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }

  return (
    <Layout>
      <Navbar />
      <ModalForm buttonText={"Create Task"} handleForm={createTask} />
      <div className="container mt-4 bg-purple-200 px-3 mb-4">
        <h2 className="text-center mt-6 pt-4 mb-3">Tasks List</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {tasks?.map((task, index) => (
            <div key={index} className="col px-4 py-3">
              <div className="card  rounded-md shadow-md cursor-pointer">
                <div className="card-body">
                  <p className="flex items-center justify-between">
                    <ModalForm
                      buttonText={"Update Task"}
                      handleForm={updateTask}
                    />

                    <button onClick={() => deleteTask(task.id)}>-</button>
                  </p>
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p className="card-text">
                    <strong>Status: </strong>
                    {task.status}
                  </p>
                  <p className="card-text">
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p className="card-text">
                    <strong>Deadline:</strong> {task.deadline}
                  </p>
                  <p className="card-text">
                    <strong>Estimated Time:</strong> {task.estimated_time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProjectList;
