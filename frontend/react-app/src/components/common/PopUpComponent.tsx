import React, { memo, useEffect, useRef, ReactNode } from 'react';

type Props = {
    viewFlag: boolean;
    setViewFlag: (viewFlag: boolean) => void;
    children: ReactNode; // IngredientsInput コンポーネントを含む任意の要素を受け入れる
};

const PopUpComponent = memo((props: Props) => {
    const { viewFlag, setViewFlag, children } = props;
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const registerBackgroundFixed = () => {
            const body = document.body;
            const scrollWidth = window.innerWidth - body.clientWidth;
            body.style.marginRight = `${scrollWidth}px`;
            body.style.overflowY = 'hidden';
        };

        const unRegisterBackgroundFixed = () => {
            const body = document.body;
            body.style.overflowY = '';
            body.style.marginRight = '';
        };

        if (viewFlag) {
            registerBackgroundFixed();
            // ポップアップ内のスクロールができるようにする
            if (popupRef.current) {
                popupRef.current.style.overflowY = 'auto';
            }
        } else {
            unRegisterBackgroundFixed();
        }

        return () => {
            unRegisterBackgroundFixed();
        };
    }, [viewFlag]);

    const onClickBackground = () => {
        setViewFlag(false);
    };

    const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <>
            <div
                className={
                    'fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50 transition-all ' +
                    (viewFlag ? ' top-0 left-0 h-screen w-screen ' : ' top-1/2 left-1/2 h-0 w-0 ')
                }
                onClick={onClickBackground}
            >
                <div className="relative h-3/4 w-3/4 max-w-3xl bg-white rounded-md" ref={popupRef}>
                    <div className="absolute right-0 top-3 h-10 w-10 hover:cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="flex h-full w-full flex-col bg-white p-4" onClick={onClickCard}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
});

export default PopUpComponent;
