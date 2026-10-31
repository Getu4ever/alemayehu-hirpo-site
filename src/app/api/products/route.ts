import { NextResponse } from "next/server";
import {
  fetchPrintifyProducts,
  isPrintifyConfigured,
  getShopProducts,
} from "@/lib/printify";

export async function GET() {
  try {
    if (!isPrintifyConfigured()) {
      const products = await getShopProducts();
      return NextResponse.json({
        source: "static",
        products,
        message:
          "PRINTIFY_API_TOKEN / PRINTIFY_STORE_ID not set — returning static catalogue.",
      });
    }

    const products = await fetchPrintifyProducts();
    return NextResponse.json({
      source: "printify",
      products,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
