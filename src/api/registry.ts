import axios, { AxiosInstance } from 'axios'
import { RegistryEntry } from '../@types'

const DOMAIN = process.env.BACKEND_DOMAIN || 'http://localhost:5000'
const BASE_URL = `${DOMAIN}/registry`

const api: AxiosInstance = axios.create({
  headers: {},
})

const getAllFinishers = async (): Promise<RegistryEntry[]> => {
  const response = await api.get(`${BASE_URL}/`)
  return response.data
}

const getFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`${BASE_URL}/${id}`)
  return response.data
}

const incrementFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`${BASE_URL}/${id}/increment`)
  return response.data
}

const decrementFinishers = async (id: string): Promise<RegistryEntry[]> => {
  const response = await api.get(`${BASE_URL}/${id}/decrement`)
  return response.data
}
