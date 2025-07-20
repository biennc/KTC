import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Roles API: Received GET request');
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Roles API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Roles API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Roles API: Calling:', `${apiUrl}/security/roles`);
    
    const response = await fetch(`${apiUrl}/security/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    console.log('Roles API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Roles API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch roles', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Roles API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Roles API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Roles API: Received POST request');
    
    const body = await request.json();
    console.log('Roles API: Request body keys:', Object.keys(body));
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Roles API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Roles API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Roles API: Calling:', `${apiUrl}/security/roles`);
    
    const response = await fetch(`${apiUrl}/security/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    console.log('Roles API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Roles API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to create role', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Roles API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Roles API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
