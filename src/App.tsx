import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BasicLayout from "./ui/BasicLayout";
import CreateSuggestion from "./suggestion/CreateSuggestion";
import SuggestionList from "./suggestion/SuggestionList";
import ViewSuggestion from "./suggestion/ViewSuggestion";
import AppLayout from "./ui/AppLayout";
import FullSpinner from "./ui/FullSpinner";
import Signin from "./user/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalContextProvider from "./context";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
    },
  },
});



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalContextProvider>
        <BrowserRouter>
          <Suspense fallback={<FullSpinner />}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate replace to="suggestions" />} />
                <Route path="suggestions" element={<SuggestionList />} />
                {/* <Route path="suggestions/view" element={<ViewSuggestion />} /> */}
                <Route path="suggestions/:id" element={<ViewSuggestion />} />
              </Route>

              <Route path="suggestions/create" element={<CreateSuggestion />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}

export default App;
