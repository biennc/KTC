import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('API Proxy: Received refresh token request');

    let body = {};
    try {
      body = await request.json();
      console.log('API Proxy: Request body keys:', Object.keys(body));
    } catch (parseError) {
      console.log('API Proxy: No JSON body provided, using empty body');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('API Proxy: Calling:', `${apiUrl}/auth/refresh`);

    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
      },
      body: JSON.stringify(body),
    });

    console.log('API Proxy: Refresh response status:', response.status);
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('API Proxy: Failed to parse refresh response as JSON:', parseError);
      const text = await response.text();
      console.error('API Proxy: Response text:', text);
      return NextResponse.json(
        { error: 'Invalid response from server', details: text },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error('API Proxy: Refresh server error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('API Proxy: Refresh network/server error:', error);
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
