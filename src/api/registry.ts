import axios, { AxiosInstance } from 'axios'

const domain = process.env.GATSBY_BACKEND_DOMAIN || 'https://finishershub-backend.herokuapp.com'

const backend: AxiosInstance = axios.create({
  baseURL: `${domain}/registry`,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  },
})

const getAllFinishers = (callback: Function) => {
  backend.get(`/`).then(response => callback(response.data))
}

const getFinishers = (id: string, callback: Function) => {
  backend.get(`/${id}`).then(response => callback(response.data))
}

const incrementFinishers = (id: string, arena: number, callback: Function) => {
  console.log(`/${id}/${arena}/increment`)
  backend.put(`/${id}/${arena}/increment`).then(response => callback(response.data))
}

const decrementFinishers = (id: string, arena: number, callback: Function) => {
  console.log(`/${id}/${arena}/decrement`)
  backend.put(`/${id}/${arena}/decrement`).then(response => callback(response.data))
}

const updatePassword = (id: string, newPassword: string, callback: Function) => {
  backend.put(`/${id}/password/${newPassword}`).then(response => callback(response.data))
}

const registryApi = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
  updatePassword,
}

export default registryApi
