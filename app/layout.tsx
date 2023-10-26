import '#/styles/globals.css'
import Header from '#/components/Header'

export const metadata = {
  title: 'Amagi',
  description: 'Developer',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
