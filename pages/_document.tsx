import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import * as snippet from '@segment/snippet'

const {
  // This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
  ANALYTICS_WRITE_KEY,
  NODE_ENV = 'development',
} = process.env

if (!ANALYTICS_WRITE_KEY) {
  throw new Error('No segment key specified!')
}

class ADocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  renderSnippet() {
    const opts = {
      apiKey: ANALYTICS_WRITE_KEY!,
      page: true,
    }

    if (NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }

  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ADocument
