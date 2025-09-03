'use client';

import { useEffect, useMemo, useState } from 'react';

type School = {
	id: number;
	name: string;
	address: string;
	city: string;
	state: string;
	contact: string;
	image: string;
	email_id: string;
};

export default function ShowSchoolsPage() {
	const [schools, setSchools] = useState<School[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [q, setQ] = useState('');

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setLoading(true);
				const res = await fetch('/api/getSchools', { cache: 'no-store' });
				const json = await res.json();
				if (!cancelled) {
					if (json.success) setSchools(json.data as School[]);
					else setError(json.error || 'Failed to load');
				}
			} catch (e) {
				if (!cancelled) setError('Network error');
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, []);

	const filtered = useMemo(() => {
		const query = q.trim().toLowerCase();
		if (!query) return schools;
		return schools.filter((s) =>
			[s.name, s.address, s.city, s.state, s.contact, s.email_id]
				.filter(Boolean)
				.some((v) => String(v).toLowerCase().includes(query))
		);
	}, [q, schools]);

	return (
		<section className="max-w-6xl mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-semibold tracking-tight text-center">School Search</h1>
				<p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">Find the right school for your child.</p>
				<div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
					<input
						className="h-11 w-full sm:w-[520px] px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500"
						type="search"
						placeholder="Search by name, city, or contact..."
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>
				</div>
			</div>

			{loading && <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading…</p>}
			{error && <p className="text-sm text-red-600">{error}</p>}
			{!loading && !error && filtered.length === 0 && <p className="text-sm text-neutral-600 dark:text-neutral-400">No schools found.</p>}

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filtered.map((s) => (
					<li key={s.id} className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 hover:border-neutral-300 dark:hover:border-neutral-700">
						<div className="relative aspect-[16/10] overflow-hidden">
							<img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={s.image} alt={s.name} />
						</div>
						<div className="p-4">
							<h3 className="text-base font-semibold mb-1 truncate">{s.name}</h3>
							<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{s.address}</p>
							<div className="mt-2 flex items-center gap-2">
								<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">{s.city}</span>
								<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">{s.state}</span>
							</div>
							<p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
								<a className="hover:underline" href={`tel:${s.contact}`}>{s.contact}</a>
								<span className="mx-2">·</span>
								<a className="hover:underline" href={`mailto:${s.email_id}`}>{s.email_id}</a>
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}


