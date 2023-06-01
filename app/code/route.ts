import { NextResponse } from "next/server";

import code from "./code.json";

export const GET = async () => {
  return NextResponse.json(code);
};
