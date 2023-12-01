import React from 'react';

export interface Option {
    value: string;
    label: string;
}

interface DropdownListProps {
    options: Option[];
    selectedOption: Option | undefined;
    setSelectedOption: (selectedOption: Option | undefined) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ options, selectedOption, setSelectedOption }) => {
    const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selected = options.find((option: Option) => option.value === selectedValue);
        setSelectedOption(selected);
    };

    return (
        <>
            <select
                value={selectedOption?.value || ''}
                onChange={handleSelectOption}
                className="px-2 bg-gray-50 border border-gray-300 text-sm rounded-s-lg"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default DropdownList;
