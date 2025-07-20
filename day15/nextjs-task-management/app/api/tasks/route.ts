import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    console.log('Tasks API: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Tasks API: Extracted token:', token ? 'present' : 'missing');
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';

    const response = await fetch(`${apiUrl}/workspaces/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
      },
    });

    console.log('Tasks API: Response status:', response.status);
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Tasks API: Failed to parse response as JSON:', parseError);
      const text = await response.text();
      console.error('Tasks API: Response text:', text);
      return NextResponse.json(
        { error: 'Invalid response from server', details: text },
        { status: 502 }
      );
    }

    // console.log('Tasks API: Response data keys:', Object.keys(data));

    if (!response.ok) {
      console.error('Tasks API: Server error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    // Return successful response
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('Tasks API: Network/Server error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to tasks server',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    console.log('Tasks API POST: Received request with auth header:', authHeader ? 'present' : 'missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const body = await request.json();
    console.log('Tasks API POST: Request body keys:', Object.keys(body));
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server.aptech.io';
    
    const response = await fetch(`${apiUrl}/workspaces/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
      },
      body: JSON.stringify(body),
    });

    console.log('Tasks API POST: Response status:', response.status);
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Tasks API POST: Failed to parse response as JSON:', parseError);
      const text = await response.text();
      console.error('Tasks API POST: Response text:', text);
      return NextResponse.json(
        { error: 'Invalid response from server', details: text },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error('Tasks API POST: Server error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
    
  } catch (error) {
    console.error('Tasks API POST: Network/Server error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to tasks server',
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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
