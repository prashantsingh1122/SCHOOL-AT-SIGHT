import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { getPool } from '../../../../lib/db';

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDigitsOnly(value: string): boolean {
	return /^\d+$/.test(value);
}

export async function GET() {
	try {
		const pool = getPool();
		const [rows] = await pool.query(
			'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC'
		);
		return NextResponse.json({ success: true, data: rows });
	} catch (err) {
		console.error('GET /api/schools error:', err);
		return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const form = await req.formData();
		const name = ((form.get('name') as string) || '').trim();
		const address = ((form.get('address') as string) || '').trim();
		const city = ((form.get('city') as string) || '').trim();
		const state = ((form.get('state') as string) || '').trim();
		const contact = ((form.get('contact') as string) || '').trim();
		const email_id = ((form.get('email_id') as string) || '').trim();
		const imageFile = form.get('image');

		if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
			return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
		}

		if (!isValidEmail(email_id)) {
			return NextResponse.json({ success: false, error: 'Invalid email.' }, { status: 400 });
		}

		if (!isDigitsOnly(contact) || contact.length < 7 || contact.length > 15) {
			return NextResponse.json({ success: false, error: 'Invalid contact number.' }, { status: 400 });
		}

		if (!(imageFile instanceof File)) {
			return NextResponse.json({ success: false, error: 'Image is required.' }, { status: 400 });
		}

		const arrayBuffer = await imageFile.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadsDir = path.join(process.cwd(), 'public', 'schoolImages');
		await fs.mkdir(uploadsDir, { recursive: true });

		const timestamp = Date.now();
		const safeName = (imageFile.name || 'image')
			.replace(/[^a-zA-Z0-9.\-_/]/g, '_')
			.replace(/\s+/g, '_');
		const filename = `${timestamp}-${safeName}`;
		const filePath = path.join(uploadsDir, filename);
		await fs.writeFile(filePath, buffer);

		const storedImagePath = `/schoolImages/${filename}`;

		const pool = getPool();
		await pool.query(
			'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[name, address, city, state, contact, storedImagePath, email_id]
		);

		return NextResponse.json({ success: true, message: 'School added successfully.' });
	} catch (err) {
		console.error('POST /api/schools error:', err);
		return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
	}
}