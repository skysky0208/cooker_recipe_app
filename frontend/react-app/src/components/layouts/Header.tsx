import AuthHeaderButton from 'components/HeaderAuthButton';

const Header = () => {
    return (
        <>
            <header className="text-neutral-600 body-font">
                <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <a href="/" className="flex items-center mb-3 md:mb-0">
                        <img src={`${process.env.PUBLIC_URL}/logo_header.png`} alt="logo" className="w-50" />
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <a className="text-sm md:text-base font-bold hover:text-neutral-600  mr-3 md:mr-5">
                            マイページ
                        </a>
                        <a className="text-sm md:text-base font-bold hover:text-neutral-600  mr-3 md:mr-5">
                            レシピ一覧
                        </a>
                        <button className="flex text-sm md:text-base font-bold bg-logo-darkorange hover:bg-logo-orange text-white rounded px-3 md:px-4 py-2">
                            レシピを書く
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                className="ml-2 w-5 h-5 md:w-6 md:h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </button>
                        <AuthHeaderButton />
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
