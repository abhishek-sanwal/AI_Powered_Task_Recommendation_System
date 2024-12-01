import axios from "axios";
import bin_icon from "./bin.png";
const axiosBase = axios.create({
  baseURL: "http://127.0.0.1:5000/auth",
});

const axiosTask = axios.create({
  baseURL: "http://127.0.0.1:5000/task",
});

const signupEndpoint = "/signup"; //Post
//  request {
//   "username":"",
//   "email":"",
//   "password":""
// }

const loginEndpoint = "/login"; //Post
// {
//   "email":"",
//   "password":""
// }

const taskCreateEndpoint = "/"; //POST
// {
//   "title":"Assignment",
//   "description":"You have to do a Assignment",
//   "status":"pending",
//   "priority":"1",
//   "deadline" :"2022/08/18 10:20:05",
//   "estimated_time":"2.2",
//   "user_id" :"1"
// }
const taskListEndpoint = "/users-task"; // GET

const taskUpdateEndpoint = "/"; // PUT
// {
//   "title":"Changed Assignment Name",
//   "description":"You have to do a Assignment",
//   "status":"pending",
//   "priority":"1",
//   "deadline" :"2022/08/18 10:20:05",
//   "estimated_time":"2.2",
//   "user_id" :"1"
// }
const taskDeleteEndpoint = "/"; // DELETE

export {
  signupEndpoint,
  loginEndpoint,
  axiosBase,
  taskListEndpoint,
  taskCreateEndpoint,
  taskUpdateEndpoint,
  taskDeleteEndpoint,
  axiosTask,
  bin_icon,
};
