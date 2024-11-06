// src/app/api/sanityFetch/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const response = await fetch(
    `https://4du27trl.apicdn.sanity.io/v2022-03-07/data/query/production?${query}`,
    {
      method: "GET",
      mode: "cors",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Erreur de récupération des données Sanity" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
