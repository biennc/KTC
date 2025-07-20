import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('API Proxy: Received logout request');
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('API Proxy: Calling:', `${apiUrl}/auth/logout`);
    
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
      },
    });

    console.log('API Proxy: Logout response status:', response.status);
    
    // Logout might return empty response, so handle gracefully
    let data = {};
    if (response.headers.get('content-type')?.includes('application/json')) {
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn('API Proxy: Logout response not JSON, treating as success');
      }
    }

    if (!response.ok) {
      console.error('API Proxy: Logout server error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, ...data }, { status: 200 });
    
  } catch (error) {
    console.error('API Proxy: Logout network/server error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to authentication server',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
