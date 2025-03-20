import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: 'Authentication Required',
        message: 'You need to be logged in as an administrator to access this API.',
        statusCode: 401
      }),
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // This is test admin data that should be protected
  return NextResponse.json({
    adminData: "This is secret admin data",
    user: session.user
  });
}
