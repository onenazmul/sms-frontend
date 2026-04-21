import { NextResponse } from "next/server";

const BACKEND_URL = "https://sms-api.chalanbeel.com/api/admission";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();

    const response = await fetch(`${BACKEND_URL}?${query}`, {
      headers: {
        Accept: "application/json",
        "X-Tenant-Domain": "school1.com",
      },
      cache: "no-store",
    });

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Server connection failed" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure your .env has BACKEND_API_URL=https://your-laravel-api.com
    //const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`https://sms-api.chalanbeel.com/api/admission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Tenant-Domain": "school1.com", 
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend Error:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ message: "Server connection failed" }, { status: 500 });
  }
}
