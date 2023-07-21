import { Metadata } from 'next';
import './globals.css'

export const metadata: Metadata = {
  title: 'theancestral',
  description: 'theancestral',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html className='h-full bg-gray-900' lang='en'>
      <body className='h-full'>
        {children}
      </body>
    </html>
  );
};
