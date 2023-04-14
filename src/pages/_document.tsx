import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <title>Atties</title>
          <meta name="theme-color" content="#000000" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, maximum-scale=5.0, user-scalable=yes"
          />
          <meta
            name="og:description"
            content="졸업작품 거래 플랫폼, 아띠즈:art:"
          />
          <meta property="og:title" content="아띠즈:art:" />
          <meta property="og:type" content="website" />
          <meta
            name="url"
            property="og:url"
            content="https://user-images.githubusercontent.com/62178788/218947618-632d91ec-c4e6-4192-9ff6-66205ad6d635.svg"
          />
          <meta
            name="image"
            property="og:image"
            content="https://user-images.githubusercontent.com/62178788/218947618-632d91ec-c4e6-4192-9ff6-66205ad6d635.svg"
          />
          <meta
            name="article"
            property="og:article:author"
            content="졸업작품 거래 플랫폼"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
