import useFetch from '../hooks/useFetch';
export default function DataFetcher() {
	const { data, loading } = useFetch(
		'https://jsonplaceholder.typicode.com/posts?_limit=5',
	);
	return (
		<div>
			<h2>Fetched Posts</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{data.map((post) => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}
