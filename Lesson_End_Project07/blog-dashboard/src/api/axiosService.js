import axios from 'axios';
// Create an Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});
// Function to create a new post using Axios
export const createPost = async (postData) => {
	const response = await axiosInstance.post('/posts', postData);
	return response.data;
};
