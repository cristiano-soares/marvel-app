import axios from 'axios';

export const loadComics = async query => {
    const params = {
        'apikey': '44db65d7e1952869be0451a4c5426eda',
        'hash': 'ffd275c5130566a2916217b101f26150',
        'limit': '20'
    }

    if (query) {
        params.titleStartsWith = query;
    }
    const instance = axios.create({
        baseURL: 'https://gateway.marvel.com/v1/public/comics',
        params,
        timeout: 10000,
        method: 'get',
        responseType: 'json'
    });

    const response = await instance.get();
    return response;
}