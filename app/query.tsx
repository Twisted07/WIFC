// "use client"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Spin } from "antd";
// import { Suspense } from "react";

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: 1000 * 60 * 5, // 5 minutes
//         }
//     }
// });

// export function QueryProvider ({children} : {children: React.ReactNode}) {
//     return (
//         <QueryClientProvider client={queryClient}>
//             <ReactQueryDevtools initialIsOpen={false} />
//                 {/* <Suspense fallback={<Spin />}> */}
//                     {children}
//                 {/* </Suspense> */}
//         </QueryClientProvider>
//     );
// }