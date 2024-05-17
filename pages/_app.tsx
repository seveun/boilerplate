import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UserContext";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
