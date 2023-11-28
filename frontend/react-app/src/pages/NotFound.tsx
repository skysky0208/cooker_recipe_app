import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUserForMypage } from 'lib/api/user';
import { User, Recipe } from 'interfaces';
import { RecipeCards } from 'components/user';

const NotFound = () => {
    return (
        <div className="grid h-screen px-4 place-content-center">
            <div className="text-center">
                <h1 className="font-black text-orange-200 text-9xl">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500">We can't find that page.</p>

                <Link
                    to="/"
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:ring"
                >
                    Topページに戻る
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
