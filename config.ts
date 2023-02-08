export const CONFIG = {
  LOCAL: process.env.NEXT_PUBLIC_LOCAL,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  ENV: process.env.NODE_ENV,
  API_KEYS: {
    KAKAO: process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_KEY,
    NAVER: process.env.NEXT_PUBLIC_NAVER_LOGIN_API_KEY,
  },
} as const;
