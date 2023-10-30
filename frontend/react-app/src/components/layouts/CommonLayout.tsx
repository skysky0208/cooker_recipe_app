import React from 'react';

import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';

interface CommonLayoutProps {
    children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <>
            <Header />
            <main className="w-full mx-auto">
                <div className="mx-auto bg-orange-50">
                    <div className="flex justify-center w-full">{children}</div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CommonLayout;
