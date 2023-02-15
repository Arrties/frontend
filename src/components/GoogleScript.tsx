import { CONFIG } from '@config';
import Script from 'next/script';

export default function GoogleScript() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_TAG}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${CONFIG.GOOGLE_TAG}', {
            page_path: window.location.pathname,

          });
        `,
        }}
      />
    </>
  );
}
