import axios, { type AxiosInstance } from 'axios'

const backend: AxiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

const getAllFinishers = (callback: Function) => {
  backend.get(`/api/registry`).then((response) => callback(response.data))
}

const getFinishers = (id: string, callback: Function) => {
  backend.get(`/api/registry/${id}`).then((response) => callback(response.data))
}

const incrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/api/registry/increment/${id}/${arena}`).then((response) => callback(response.data))
}

const decrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/api/registry/decrement/${id}/${arena}`).then((response) => callback(response.data))
}

const updatePassword = (id: string, newPassword: string, callback: Function) => {
  backend
    .put(`/api/registry/${id}/password/${newPassword}`)
    .then((response) => callback(response.data))
}

const registryAPI = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
  updatePassword,
}

export default registryAPI
