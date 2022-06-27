import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/assets/css/montserrat_font.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/main.css" rel="stylesheet" type="text/css" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
}