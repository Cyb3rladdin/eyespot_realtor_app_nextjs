import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'



    export const fetchApi = async (url) => {
        const { data } = await axios.get((url), {
            headers: {
                'X-RapidAPI-Key': '6ee7b2ae77msh56984fd144a2871p185d4djsn8dcb8acd6f47',
                'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
            }
        });

        return data;
    }