import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('User Roles API: Received PATCH request for user ID:', params.id);
    
    const body = await request.json();
    console.log('User Roles API: Request body keys:', Object.keys(body));
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('User Roles API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('User Roles API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    
    // Based on Postman collection, we need to use add-roles-to-user endpoint
    console.log('User Roles API: Calling:', `${apiUrl}/security/users/${params.id}/add-roles-to-user`);
    
    const response = await fetch(`${apiUrl}/security/users/${params.id}/add-roles-to-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    console.log('User Roles API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('User Roles API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to update user roles', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('User Roles API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('User Roles API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
