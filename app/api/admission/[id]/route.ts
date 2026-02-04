import { NextResponse } from "next/server";

const BACKEND_URL = "https://sms-api.chalanbeel.com/api/admission";
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-Tenant-Domain": "school1.com",
};

// GET: Fetch single record
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Type it as a Promise
) {
  try {
    // 1. Unwrapping the params promise
    const { id } = await params;

    const response = await fetch(`${BACKEND_URL}/${id}`, { headers: HEADERS });
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}

// PUT: Update single record
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Type it as a Promise
) {
  try {
    // 1. Unwrapping the params promise
    const { id } = await params;
    
    const body = await req.json();
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}