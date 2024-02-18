import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "./_providers";
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
 
// TODO: change the name
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return (
    <Providers>
      { getLayout(<Component {...pageProps} />) }
    </Providers>
  )
}

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Providers>
//       <Component {...pageProps} />
//     </Providers>
//   )
// }