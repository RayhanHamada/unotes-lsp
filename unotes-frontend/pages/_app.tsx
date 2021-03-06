import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
