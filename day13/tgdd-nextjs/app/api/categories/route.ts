import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    const categories = await response.json()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
