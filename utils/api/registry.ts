import axios, { type AxiosInstance } from 'axios'

const backend: AxiosInstance = axios.create({
  baseURL: '/api/mongo/registry',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

const getAllFinishers = (callback: Function) => {
  backend.get(`/`).then((response) => callback(response.data))
}

const getFinishers = (id: string, callback: Function) => {
  backend.get(`/${id}`).then((response) => callback(response.data))
}

const incrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/increment/${id}/${arena}`).then((response) => callback(response.data))
}

const decrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/decrement/${id}/${arena}`).then((response) => callback(response.data))
}

const updatePassword = (id: string, newPassword: string, callback: Function) => {
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
