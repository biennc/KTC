import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('Tasks Assignee API: Received request for assignee ID:', params.id);
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    console.log('Tasks Assignee API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    // Extract the token from the Authorization header
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Tasks Assignee API: Extracted token:', token ? 'present' : 'missing');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    console.log('Tasks Assignee API: Calling:', `${apiUrl}/workspaces/tasks/assignee/${params.id}`);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(`${apiUrl}/workspaces/tasks/assignee/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('Tasks Assignee API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tasks Assignee API: Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch tasks by assignee', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Tasks Assignee API: Success, returning data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Tasks Assignee API: Network/server error:', error);

    // Handle timeout specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout', details: 'The server took too long to respond. Please try again.' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
