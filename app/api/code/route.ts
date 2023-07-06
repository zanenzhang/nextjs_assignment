import { NextResponse } from "next/server";

import code from "./code.json";

// Add in middleware for token security

export const GET = async (request: any) => {
  return NextResponse.json(code);
};
