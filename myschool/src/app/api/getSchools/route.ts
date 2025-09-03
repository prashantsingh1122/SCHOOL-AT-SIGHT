import { NextResponse } from 'next/server';
import { getPool } from '../../../../lib/db';

export async function GET() {
	try {
		const pool = getPool();
		const [rows] = await pool.query(
			'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC'
		);
		return NextResponse.json({ success: true, data: rows });
	} catch (err) {
		console.error('GET /api/getSchools error:', err);
		return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
	}
}


