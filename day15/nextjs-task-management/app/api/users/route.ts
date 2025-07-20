import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Users API: Received GET request');
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Users API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Users API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Users API: Calling:', `${apiUrl}/security/users`);
    
    const response = await fetch(`${apiUrl}/security/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    console.log('Users API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Users API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch users', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Users API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Users API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Users API: Received POST request');
    
    const body = await request.json();
    console.log('Users API: Request body keys:', Object.keys(body));
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Users API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Users API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Users API: Calling:', `${apiUrl}/security/users`);
    
    const response = await fetch(`${apiUrl}/security/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    console.log('Users API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Users API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to create user', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Users API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Users API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
