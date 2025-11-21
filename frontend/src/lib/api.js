import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export async function fetchBlogPosts() {
  try {
    const response = await api.get('/blog-posts?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPost(id) {
  try {
    const response = await api.get(`/blog-posts/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export function getImageUrl(image) {
  if (!image) return null;
  const url = image.url;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
}
