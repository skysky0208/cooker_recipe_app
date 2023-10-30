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
            <main className="w-full mx-auto">
                <div className="mx-auto bg-orange-50">
                    <div className="flex justify-center w-full">{children}</div>
                </div>
            </main>
        </>
    );
};

export default CommonLayout;
