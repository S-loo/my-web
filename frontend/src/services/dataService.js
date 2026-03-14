import api from '../services/api';

export const portfolioService = {
  getProjects: async () => {
    const response = await api.get('/projects/');
    return response.data;
  },
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  },
};

export const blogService = {
  getPosts: async (params) => {
    const response = await api.get('/blog/', { params });
    return response.data;
  },
  getPost: async (slug) => {
    const response = await api.get(`/blog/${slug}/`);
    return response.data;
  },
  getTags: async () => {
    const response = await api.get('/blog/tags/');
    return response.data;
  },
};

export const marketplaceService = {
  getProducts: async () => {
    const response = await api.get('/marketplace/products/');
    return response.data;
  },
  getProduct: async (id) => {
    const response = await api.get(`/marketplace/products/${id}/`);
    return response.data;
  },
};
