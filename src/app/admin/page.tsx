'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getSession() {
  const session = await getServerSession();
  if (!session) {
    redirect('/unauthorized');
  }
  return session;
}

export default async function AdminDashboard() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Out
                </button>
              </form>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome, {session?.user?.email}
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Add your admin features here */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {/* Add icon here if needed */}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Manage Posts
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                Coming Soon
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
