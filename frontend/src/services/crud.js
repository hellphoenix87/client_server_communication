//import http from "../http-common";

import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});

/*const getAll = () => {
    const response = http.get("students/").catch(error => {
        console.log(error);
    });
    return response;*/

const getAll = () => {
  //console.log("getAll()");
  return http.get("students/");
};

const getOne = (id) => {
  return http.get(`students/${id}/`);
};

const create = (data) => {
  return http.post("students/", data);
};
const deleteById = (id) => {
  return http.delete(`students/${id}/`);
  console.log(`deleteById(${id})`);
};
const update = (id, data) => {
  return http.put(`students/${id}/`, data);
};

const StudentService = {
  getAll,
  create,
  deleteById,
  getOne,
  update,
};

export default StudentService;
