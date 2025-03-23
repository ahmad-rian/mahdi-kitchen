import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AppLayout from '@/Layouts/AppLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        return resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ).then(page => {
            // Jika halaman ada di area admin atau profil, jangan terapkan AppLayout
            if (name.startsWith('Admin/') || name === 'Profile/Edit') {
                return page;
            }
            
            // Terapkan layout default ke halaman publik jika belum ditentukan
            if (page.default.layout === undefined) {
                page.default.layout = (page) => <AppLayout auth={page.props.auth}>{page}</AppLayout>;
            }
            return page;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});