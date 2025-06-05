import { NextResponse } from "next/server"

export async function GET() {
  // Fetch from your Python OPC UA Flask server
  try {
    const res = await fetch("http://localhost:5005/api/axis-positions")
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch OPC UA data" }, { status: 500 })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
