import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const offset = searchParams.get("offset") || "0"
    const limit = searchParams.get("limit") || "10"
    const categoryId = searchParams.get("categoryId")

    let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    if (categoryId) {
      url += `&categoryId=${categoryId}`
    }

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await response.json()

    return NextResponse.json({
      products,
      total: products.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)

    // Try to fetch fallback data
    try {
      const fallbackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/fallback`,
      )
      const fallbackData = await fallbackResponse.json()
      return NextResponse.json(fallbackData)
    } catch (fallbackError) {
      console.error("Error fetching fallback products:", fallbackError)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
  }
}