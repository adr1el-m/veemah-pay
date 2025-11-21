export const metadata = {
  title: 'VeemahPay',
  description: 'VeemahPay — Modern banking landing page',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}