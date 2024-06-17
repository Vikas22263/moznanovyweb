// pages/404.js

import Link from 'next/link';
import Header from '../components/header/main';
import Footer from '../components/footer/main';

export default function Custom404() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-center mt-16">
        <h1 className="text-4xl font-bold mb-4">404 - Stránka nebyla nalezena</h1>
        <p className="mb-6">Omlouváme se, ale tato stránka neexistuje.</p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">Jít zpět na hlavní stránku</p>
        </Link>
      </div>
      <Footer />
    </>
  );
}
