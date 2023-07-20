import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'bg-[#101826]'}>
        {children}
      </body>
    </html>
  );
};
