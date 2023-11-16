import React, { useState, useCallback } from 'react';
import { Area, MediaSize } from 'react-easy-crop';
import CropperModal from '../crop/CropperModel';
import getCroppedImg from 'function/croppingImg_function';
export const ASPECT_RATIO = 4 / 3;
export const CROP_WIDTH = 400;

interface ImageInputProps {
    setImage: (value: React.SetStateAction<string>) => void;
    defult_image_src: string | undefined;
}

const ImageInput: React.FC<ImageInputProps> = ({ setImage, defult_image_src }) => {
    const [preview, setPreview] = useState<string>('');

    // Cropモーダルの開閉
    const [isOpen, setIsOpen] = useState(false);

    /** アップロードした画像URL */
    const [imgSrc, setImgSrc] = useState('');

    /** 画像の拡大縮小倍率 */
    const [zoom, setZoom] = useState(1);
    /** 画像拡大縮小の最小値 */
    const [minZoom, setMinZoom] = useState(1);

    /** 切り取る領域の情報 */
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    /** 切り取る領域の情報 */
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (reader.result) {
                    setImgSrc(reader.result.toString() || '');
                    setIsOpen(true);
                }
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
            // 縦幅に合わせてZoomを指定
            const result = CROP_WIDTH / ASPECT_RATIO / height;
            setZoom(result);
            setMinZoom(result);
            return;
        }
        // 横幅に合わせてZoomを指定
        const result = CROP_WIDTH / width;
        setZoom(result);
        setMinZoom(result);
    }, []);

    /**
     * 切り取り完了後、切り取り領域の情報をセット
     */
    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    /**
     * 切り取り後の画像を生成し画面に表示
     */
    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels, setImage);
            setPreview(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imgSrc, setImage]);

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
                    onChange={onFileChange}
                />
            </label>
            <CropperModal
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                imgSrc={imgSrc}
                showCroppedImage={showCroppedImage}
                onMediaLoaded={onMediaLoaded}
                minZoom={minZoom}
            />
        </div>
    );
};

export default ImageInput;
