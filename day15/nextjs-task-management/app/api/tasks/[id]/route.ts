import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('Task API: Received GET request for task ID:', params.id);
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Task API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Task API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Task API: Calling:', `${apiUrl}/workspaces/tasks/${params.id}`);
    
    const response = await fetch(`${apiUrl}/workspaces/tasks/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    console.log('Task API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Task API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch task', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Task API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Task API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('Task API: Received PATCH request for task ID:', params.id);
    
    const body = await request.json();
    console.log('Task API: Request body keys:', Object.keys(body));
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Task API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Task API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Task API: Calling:', `${apiUrl}/workspaces/tasks/${params.id}`);
    
    const response = await fetch(`${apiUrl}/workspaces/tasks/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    console.log('Task API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Task API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to update task', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Task API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Task API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('Task API: Received DELETE request for task ID:', params.id);
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Task API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Task API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Task API: Calling:', `${apiUrl}/workspaces/tasks/${params.id}`);
    
    const response = await fetch(`${apiUrl}/workspaces/tasks/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    console.log('Task API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Task API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to delete task', details: errorText },
        { status: response.status }
      );
    }

    // For DELETE, response might be empty
    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      // Response might be empty for DELETE
      console.log('Task API: DELETE response is empty (expected)');
    }
    
    console.log('Task API: Success, task deleted');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Task API: Network/server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
