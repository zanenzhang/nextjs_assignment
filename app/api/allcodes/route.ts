import { NextResponse } from "next/server";

import codes from "./codes.json";

// Add in middleware for token security

export const GET = async (request: any) => {
  return NextResponse.json(codes);
};
