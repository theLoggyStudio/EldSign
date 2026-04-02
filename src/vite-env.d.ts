/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYDUNYA_MASTER_KEY?: string
  readonly VITE_PAYDUNYA_TEST_PRIVATE_KEY?: string
  readonly VITE_PAYDUNYA_TEST_PUBLIC_KEY?: string
  readonly VITE_PAYDUNYA_TEST_TOKEN?: string
  readonly VITE_PAYDUNYA_LIVE_PRIVATE_KEY?: string
  readonly VITE_PAYDUNYA_LIVE_PUBLIC_KEY?: string
  readonly VITE_PAYDUNYA_LIVE_TOKEN?: string
  readonly VITE_PAYDUNYA_LIVE_MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
