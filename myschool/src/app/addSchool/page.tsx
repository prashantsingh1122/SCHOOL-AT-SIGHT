'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ServerMsg = { type: 'success' | 'error'; text: string } | null;

type FormData = {
	name: string;
	address: string;
	city: string;
	state: string;
	contact: string;
	email_id: string;
	image: FileList;
};

export default function AddSchoolPage() {
	const [submitting, setSubmitting] = useState(false);
	const [serverMsg, setServerMsg] = useState<ServerMsg>(null);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		setServerMsg(null);
		setSubmitting(true);
		try {
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('address', data.address);
			formData.append('city', data.city);
			formData.append('state', data.state);
			formData.append('contact', data.contact);
			formData.append('email_id', data.email_id);
			if (data.image && data.image[0]) formData.append('image', data.image[0]);

			const res = await fetch('/api/addSchool', { method: 'POST', body: formData });
			const json = await res.json();
			if (json.success) {
				setServerMsg({ type: 'success', text: 'School added successfully.' });
				reset();
			} else {
				setServerMsg({ type: 'error', text: json.error || 'Error' });
			}
		} catch {
			setServerMsg({ type: 'error', text: 'Network error' });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section className="max-w-2xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold tracking-tight mb-6">Add School</h1>
			<form className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-6" onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-5">
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="ABC Public School" {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })} />
						{errors.name && <p className="text-sm text-red-600">{String(errors.name.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="123 Main St" {...register('address', { required: 'Address is required', minLength: { value: 5, message: 'Address too short' } })} />
						{errors.address && <p className="text-sm text-red-600">{String(errors.address.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">City</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Prayagraj" {...register('city', { required: 'City is required' })} />
						{errors.city && <p className="text-sm text-red-600">{String(errors.city.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">State</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Uttar Pradesh" {...register('state', { required: 'State is required' })} />
						{errors.state && <p className="text-sm text-red-600">{String(errors.state.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Contact</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="tel" placeholder="9876543210" {...register('contact', { required: 'Contact is required', pattern: { value: /^\d+$/, message: 'Digits only' }, minLength: { value: 7, message: 'Too short' }, maxLength: { value: 15, message: 'Too long' } })} />
						{errors.contact && <p className="text-sm text-red-600">{String(errors.contact.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
						<input className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="email" placeholder="info@school.com" {...register('email_id', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
						{errors.email_id && <p className="text-sm text-red-600">{String(errors.email_id.message)}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">School Image</label>
						<input className="h-10 px-3 file:h-10 file:px-3 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 dark:file:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-indigo-500" type="file" accept="image/*" {...register('image', { required: 'Image is required' })} />
						{errors.image && <p className="text-sm text-red-600">{String(errors.image.message)}</p>}
					</div>
				</div>
				<div className="mt-6 flex items-center gap-3">
					<button className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 transition" disabled={submitting}>{submitting ? 'Saving…' : 'Save School'}</button>
					{serverMsg && <div className={`${serverMsg.type === 'success' ? 'text-green-600' : 'text-red-600'} text-sm`}>{serverMsg.text}</div>}
				</div>
			</form>
		</section>
	);
}