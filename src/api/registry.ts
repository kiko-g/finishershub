import axios, { AxiosInstance } from 'axios'

const backend: AxiosInstance = axios.create({
  baseURL: (process.env.BACKEND_DOMAIN || 'http://localhost:5000') + '/registry',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const getAllFinishers = (callback: Function) => {
  backend.get(`/`).then(response => callback(response.data))
}

const getFinishers = (id: string, callback: Function) => {
  backend.get(`/${id}`).then(response => callback(response.data))
}

const incrementFinishers = (id: string, callback: Function) => {
  backend.get(`/${id}/increment`).then(response => callback(response.data))
}

const decrementFinishers = (id: string, callback: Function) => {
  backend.get(`/${id}/decrement`).then(response => callback(response.data))
}

const registryApi = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
}

export default registryApi
