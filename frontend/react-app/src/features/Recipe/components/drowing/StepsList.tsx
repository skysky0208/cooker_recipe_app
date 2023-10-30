import { Step } from 'interfaces';
import React from 'react';

interface StepsListProps {
    steps: Step[];
}

const StepsList: React.FC<StepsListProps> = ({ steps }) => {
    return (
        <div className="staps mb-5">
            <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md steps-title">作り方</p>
            <div className="staps-contents mx-5">
                {steps.map((step, index) => (
                    <div className="flex mb-2" key={index}>
                        <div className=" text-orange-400 font-semibold">{step.order}</div>
                        <p className="pl-3 w-full">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepsList;
