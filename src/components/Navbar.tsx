'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full h-14 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-0 z-50">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/logo.jpg" 
            alt="Logo Universidades RD"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>
      </Link>
      <div className="space-x-6 text-sm font-medium">
        <Link href="/">
          <span className="hover:text-blue-600 cursor-pointer">Inicio</span>
        </Link>
        <Link href="/contacto">
          <span className="hover:text-blue-600 cursor-pointer">Contáctanos</span>
        </Link>
      </div>
    </nav>
  );
}

