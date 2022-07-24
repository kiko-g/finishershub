import axios, { AxiosInstance } from 'axios'
import { RegistryEntry } from '../@types'

const api: AxiosInstance = axios.create({
  baseURL: (process.env.BACKEND_DOMAIN || 'http://localhost:5000') + '/registry',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const getAllFinishers = () => {
  api.get(`/`).then(response => console.log(response.data))
}

const getFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`/${id}`)
  return response.data
}

const incrementFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`/${id}/increment`)
  return response.data
}

const decrementFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`/${id}/decrement`)
  return response.data
}

const registryApi = {
  getFinishers,
  getAllFinishers,
  incrementFinishers,
  decrementFinishers,
}

export default registryApi
