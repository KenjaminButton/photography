'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    const isActive = pathname === path;
    return `${
      isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900'
    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-4">
            <Link
              href="/admin"
              className={getLinkClassName('/admin')}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/posts"
              className={getLinkClassName('/admin/posts')}
            >
              Post Management
            </Link>
          </div>
          <div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
