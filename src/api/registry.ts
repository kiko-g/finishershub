import axios, { AxiosInstance } from 'axios'

const domainEnv = process.env.GATSBY_BACKEND_DOMAIN || 'https://finishershub-backend.vercel.app'
const domain = domainEnv.slice(-1) === '/' ? domainEnv.slice(0, -1) : domainEnv

const backend: AxiosInstance = axios.create({
  baseURL: `${domain}/api`,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

const getAllFinishers = (callback: Function) => {
  backend.get(`/registry`).then(response => callback(response.data))
}

const getFinishers = (id: string, callback: Function) => {
  backend.get(`/registry/${id}`).then(response => callback(response.data))
}

const incrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/registry/increment/${id}/${arena}`).then(response => callback(response.data))
}

const decrementFinishers = (id: string, arena: number, callback: Function) => {
  backend.put(`/registry/decrement/${id}/${arena}`).then(response => callback(response.data))
}

const updatePassword = (id: string, newPassword: string, callback: Function) => {
  backend.put(`/registry/${id}/password/${newPassword}`).then(response => callback(response.data))
}

const registryAPI = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
  updatePassword,
}

export default registryAPI
