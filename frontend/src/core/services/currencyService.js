import axios from "axios"

const API_URL = '/api/currency'

const createCurrency = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, data, config)

    return response.data
}

const updateCurrency = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, data, config)

    return response.data
}

const getCurrencies = async (token) => {

    const response = await axios.get(API_URL)

    return response.data
}

const deleteCurrency = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const currencyService = {
    createCurrency,
    updateCurrency,
    deleteCurrency,
    getCurrencies
}

export default currencyService