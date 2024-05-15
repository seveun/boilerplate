import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../context/UserContext'
import { appWithTranslation } from 'next-i18next'
import '../styles/index.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default appWithTranslation(MyApp)
