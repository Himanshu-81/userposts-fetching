import Posts from "./components/Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Posts />
      </QueryClientProvider>
    </div>
  );
}

export default App;
