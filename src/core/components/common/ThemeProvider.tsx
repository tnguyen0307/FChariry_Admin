import { PropsWithChildren, useEffect, useState } from 'react';

import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

export type ProviderProps = PropsWithChildren<{
    locale: string;
}>;

export function AntdConfigProvider({ children, locale }: ProviderProps) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 0,
                    colorPrimary: '#017840',
                    colorInfo: '#017840',
                },

                components: {},
            }}
        >
            {children}
            <ToastContainer autoClose={2000} theme="colored" />
        </ConfigProvider>
    );
}

export default function ThemeProvider(props: ProviderProps) {
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // use your loading page
        return <div className="hidden">{props.children}</div>;
    }

    return <AntdConfigProvider {...props} />;
}
