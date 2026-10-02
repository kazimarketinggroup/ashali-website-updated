import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyReportToken } from "@/src/utils/reportToken";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!verifyReportToken(token)) {
    return new NextResponse(
      JSON.stringify({
        error: "Access denied. Please submit the form to receive an authorized download link.",
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const filePath = path.join(
    process.cwd(),
    "private-assets",
    "reports",
    "Global-Sales-Capability-Index-2026-Uhubs.pdf"
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse(
      JSON.stringify({ error: "Report file not found." }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Global-Sales-Capability-Index-2026-Uhubs.pdf"',
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}
