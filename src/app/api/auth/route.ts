import { NextResponse, NextRequest } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { userId: string } }) {
	return NextResponse.json({ test: params.userId })
};