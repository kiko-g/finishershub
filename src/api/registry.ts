import axios, { AxiosInstance } from 'axios'

const domain = process.env.BACKEND_DOMAIN || 'http://localhost:5000'
console.log(domain)

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

const incrementFinishers = (id: string, callback: Function) => {
  backend.put(`/${id}/increment`).then(response => callback(response.data))
}

const decrementFinishers = (id: string, callback: Function) => {
  backend.put(`/${id}/decrement`).then(response => callback(response.data))
}

const registryApi = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
}

export default registryApi
