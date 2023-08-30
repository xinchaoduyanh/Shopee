// import the original type declarations
import 'i18next'
// import all namespaces (for the default language, only)
import { resources, defaultNS } from 'src/i18n/i18n'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['vi']
  }
}
