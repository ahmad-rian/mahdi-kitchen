import { useForm } from '@inertiajs/react';
import React from 'react';

export default function DeleteAccountForm() {
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('user-profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={deleteUser} className="space-y-6">
            <p className="text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted.
            </p>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
                type="submit"
                className="btn btn-error"
                disabled={processing}
            >
                Delete Account
            </button>
        </form>
    );
}