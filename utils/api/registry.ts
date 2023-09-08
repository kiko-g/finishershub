import axios, { type AxiosInstance } from "axios"

const backend: AxiosInstance = axios.create({
  baseURL: "/api/mongo/registry",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
})

function getAllFinishers(callback: Function) {
  backend.get(`/`).then((response) => callback(response.data))
}

function getFinishers(id: string, callback: Function) {
  backend.get(`/${id}`).then((response) => callback(response.data))
}

function incrementFinishers(id: string, arena: number, callback: Function) {
  backend.put(`/increment/${id}/${arena}`).then((response) => callback(response.data))
}

function decrementFinishers(id: string, arena: number, callback: Function) {
  backend.put(`/decrement/${id}/${arena}`).then((response) => callback(response.data))
}

function updatePassword(id: string, newPassword: string, callback: Function) {
  backend.put(`/${id}/password/${newPassword}`).then((response) => callback(response.data))
}

const registryAPI = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
  updatePassword,
}

export default registryAPI
