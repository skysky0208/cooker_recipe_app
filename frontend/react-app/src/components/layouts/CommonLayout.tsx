import React from 'react';

import Header from 'components/layouts/Header';

interface CommonLayoutProps {
    children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <>
            <header>
                <Header />
            </header>
            <body>
                <main className="w-full mx-auto p-6">
                    <div className="container mx-auto">
                        <div className="flex justify-center w-full">{children}</div>
                    </div>
                </main>
            </body>
        </>
    );
};

export default CommonLayout;
