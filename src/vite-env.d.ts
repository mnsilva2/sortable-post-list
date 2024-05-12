/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL with the Posts list */
  readonly VITE_POST_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
