import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ padding: '20px' }}>
				<h1>Blog Dashboard</h1>
				<NewPostForm />
				<PostList />
			</div>
		</QueryClientProvider>
	);
}
export default App;
