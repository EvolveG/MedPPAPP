import { useState } from 'react';
import axios from 'react-native-axios';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){

    const api = axios.create({
        baseURL: 'https://zeus-api-63pe.onrender.com/api',
        headers: {
          'Content-type': 'application/json',
        },
    });

    const loginUser = async (email, password) => {
        try {
          const response = await api.post('/SignIn', { email, password });
          const token = response.data.token; // Assuming the response contains a 'token' field
          return token;
        } catch (error) {
          throw error;
        }
    };




    return{
       loginUser
    }
}