interface ImportMetaEnv {
  readonly VITE_RESEND_API_KEY: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_SENDER_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}