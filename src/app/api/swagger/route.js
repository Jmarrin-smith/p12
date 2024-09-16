import { NextResponse } from "next/server";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../../../swagger";

export async function GET(request) {
  const uiHtml = swaggerUi.generateHTML(swaggerSpec, {});

  return new NextResponse(uiHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
