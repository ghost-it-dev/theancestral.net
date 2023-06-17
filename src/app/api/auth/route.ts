import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { userId: string } }) {
	return NextResponse.json({ test: params.userId })
};