import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AppLogo } from '@/components/Icons/AppLogo';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import Link from 'next/link';

const roboto = Roboto({ weight: ['300', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty API',
  description: 'Built with Next.js, Typescript & Shadcn UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header
          aria-label="Top Banner"
          className="min-h-[60px] fixed left-0 right-0 top-0 backdrop-blur-[5px] backdrop-saturate-[180%] shadow-[inset__0_-1px_0_0_#e4e4e4] bg-[hsla(0,0%,100%,.8)] mx-auto py-2 px-4 md:px-6 lg:px-10 flex justify-between"
        >
          <Link href="/" aria-label="Go home">
            <AppLogo width="120" height="44" />
          </Link>
          <Navbar />
        </header>
        <main className="min-h-[calc(100vh - 60px)] mt-[60px] px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
