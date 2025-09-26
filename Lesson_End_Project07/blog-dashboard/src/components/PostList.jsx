import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/fetchService';
export default function PostList() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['posts'], // ✅REQUIRED format in v5
		queryFn: fetchPosts, // ✅ REQUIRED format in v5
	});
	if (isLoading) return <p>Loading posts...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<div>
			<h2>Posts</h2>
			<ul>
				{data.slice(0, 5).map((post) => (
					<li key={post.id}>
						<strong>{post.title}</strong>
					</li>
				))}
			</ul>
		</div>
	);
}
