// src/services/unsplashApi.ts

import axios from 'axios';

const myApiKey = 'RixyMXtY7Prk33rgFDj_fJ-eg1T2IIWDbufYQeNlnYw';
const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${myApiKey}`,
  },
});

export const getTrendingPhotos = async (quantity: number) => {
  //TODO: it would be better to call https://unsplash.com/documentation#list-photos ???
  try {
    const photo_promises = []
    for (let i = 0; i < quantity; i++) {
      photo_promises.push(unsplashApi.get('/photos/random'))
    }
    const response = await Promise.all(photo_promises);
    const photos:any = []
    response.forEach(promise => {
      if (promise.status === 200) {
        photos.push(promise.data)
      }
    });

    return { success: true, data: photos };
  } catch (error: any) {
    console.error("Error fetching trending photos:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getPhotosByTag = async (tag: string, page: number = 1) => {
  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query: tag,
        per_page: 3,
        page: page,
      }
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error fetching photos:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getPhotoTags = async (id: string) => {
  try {
    const response = await unsplashApi.get('/photos/' + id);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error fetching photo's tags:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};