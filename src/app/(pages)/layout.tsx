import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html className="h-full bg-gray-900">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
};
