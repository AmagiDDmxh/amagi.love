/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@segment/snippet' {
  namespace SnippetModule {
    export interface snippet {
      max(opts: SnippetOptions): void
      min(opts: SnippetOptions): void
    }
  }
  interface SnippetOptions {
    apiKey: string
    page: boolean
  }

  var snippet: SnippetModule.snippet
  export = snippet
}
