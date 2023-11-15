import React, { useState } from 'react';

interface ImageInputProps {
    setImage: (value: React.SetStateAction<string>) => void;
    defult_image_src: string | undefined;
}

const ImageInput: React.FC<ImageInputProps> = ({ setImage, defult_image_src }) => {
    const [preview, setPreview] = useState<string>('');

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(window.URL.createObjectURL(file));
            setImage(file);
        } else {
            setImage('');
        }
    };

    return (
        <div>
            <label htmlFor="file-button" className="md:w-1/2 cursor-pointer block mx-auto relative">
                {preview ? (
                    <img src={preview} alt="preview img" className="object-cover w-full" />
                ) : (
                    <img src={defult_image_src} alt="sample" className="object-cover mx-auto" />
                )}
                <input
                    accept="image/png, image/jpeg, image/jpg"
                    id="file-button"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </label>
        </div>
    );
};

export default ImageInput;
