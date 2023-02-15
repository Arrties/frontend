import Head from 'next/head';

export default function HeadMeta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <title>Atties</title>
      <meta name="description" content="졸업작품 거래 플랫폼, 아띠즈:예술:" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
      />
      <meta property="og:title" content="아띠즈:예술:" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://attiess.netlify.app/" />
      <meta property="og:image" content="/public/svg/icons/icon_logo.svg" />
      <meta property="og:article:author" content="졸업작품 거래 플랫폼" />
    </Head>
  );
}
