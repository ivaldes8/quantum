import axios from "axios"

const API_URL = '/api/investments'

const createInvestment = async (investmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, investmentData, config)

    return response.data
}

const getInvestments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteInvestment = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const investmentService = {
    createInvestment,
    getInvestments,
    deleteInvestment
}

export default investmentService