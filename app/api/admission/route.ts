import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure your .env has BACKEND_API_URL=https://your-laravel-api.com
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
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
