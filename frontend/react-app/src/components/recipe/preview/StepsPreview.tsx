import { Step } from 'interfaces';
import React from 'react';
import { EditButton } from 'components/recipe';

interface Props {
    steps: Step[];
    handleSetPopup: () => void;
}

const StepsPreview: React.FC<Props> = ({ steps, handleSetPopup }) => {
    return (
        <>
            <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md">作り方</p>
            <div className="mx-8 py-2">
                {steps.map((step, index) => {
                    return (
                        <div className="flex mb-2">
                            <div className=" w-7 h-7 bg-orange-950 text-yellow-100 rounded-md text-center ">
                                {step.order}
                            </div>
                            <p className="pl-3 w-full">{step.description}</p>
                        </div>
                    );
                })}
            </div>
            <EditButton handler={handleSetPopup} text={'作り方を編集'} />
        </>
    );
};

export default StepsPreview;
