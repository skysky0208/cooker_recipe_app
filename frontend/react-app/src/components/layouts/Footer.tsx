import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-orange-300">
            <div className="w-full p-4 flex justify-center">
                <span className="text-sm text-white font-semibold">
                    © 2023{' '}
                    <a href="https://github.com/skysky0208/" className="hover:underline">
                        Natsumi Sakamoto
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
