import axios from 'axios';

let api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  withCredentials: true,
});

export class DataAccess {
  token: string = '';
  constructor(token: string) {
    token = token;
    api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
      withCredentials: true,
      headers: {
        Authorization: token,
      },
    });
  }

  public get = async (url: string) => {
    const result = await api.get(url);
    return result.data;
  };
  public put = async (url: string, data: any) => {
    const result = await api.get(url);
    return result.data;
  };
}

export default api;
