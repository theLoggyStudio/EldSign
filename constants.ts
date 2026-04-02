/**
 * Constantes PayDunya — valeurs lues depuis les variables d’environnement Vite.
 *
 * Dans `.env.test` / `.env.prod`, utilisez le préfixe **VITE_** (ex. `VITE_PAYDUNYA_MASTER_KEY`).
 * Lancez le dev test : `npm run dev:test` ; build prod : `npm run build:prod`.
 *
 * Sécurité : en production, les clés **privées** et **tokens** ne doivent pas être exposés
 * dans le bundle front ; prévoir un backend qui appelle l’API PayDunya.
 */
const e = import.meta.env

export const PAYDUNYA = {
  masterKey: (e.VITE_PAYDUNYA_MASTER_KEY as string | undefined) ?? '',
  testPrivateKey: (e.VITE_PAYDUNYA_TEST_PRIVATE_KEY as string | undefined) ?? '',
  testPublicKey: (e.VITE_PAYDUNYA_TEST_PUBLIC_KEY as string | undefined) ?? '',
  testToken: (e.VITE_PAYDUNYA_TEST_TOKEN as string | undefined) ?? '',
  livePrivateKey: (e.VITE_PAYDUNYA_LIVE_PRIVATE_KEY as string | undefined) ?? '',
  livePublicKey: (e.VITE_PAYDUNYA_LIVE_PUBLIC_KEY as string | undefined) ?? '',
  liveToken: (e.VITE_PAYDUNYA_LIVE_TOKEN as string | undefined) ?? '',
} as const

/** `true` en prod si vous lisez les clés « live » côté client (déconseillé pour les secrets). */
export const PAYDUNYA_LIVE_MODE = (e.VITE_PAYDUNYA_LIVE_MODE as string | undefined) === 'true'
