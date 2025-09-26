import { useForm } from 'react-hook-form';
import { createPost } from '../api/axiosService.js';
export default function NewPostForm() {
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = async (data) => {
		try {
			const result = await createPost(data);
			alert('Post submitted: ' + JSON.stringify(result));
			reset();
		} catch (error) {
			alert(`Submission failed: ${error.message}`);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Submit a New Post</h2>
			<input
				{...register('title', { required: true })}
				placeholder='Title'
			/>
			<textarea
				{...register('body', { required: true })}
				placeholder='Content'
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
