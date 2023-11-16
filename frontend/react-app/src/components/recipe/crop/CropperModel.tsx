import { makeStyles, Modal } from '@material-ui/core';
import React from 'react';
import Cropper, { Area, MediaSize } from 'react-easy-crop';
import { ASPECT_RATIO, CROP_WIDTH } from '../form/ImageInput';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: 420,
        height: 500,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        borderRadius: '0px 0px 10px 10px',
        '& .crop-container': {
            height: 400,
            borderRadius: '10px 10px 0px 0px',
            backgroundColor: '#f4f7fb',
            position: 'relative',
            '& .container': {},
            '& .crop-area': {
                border: '3px solid #00A0FF',
            },
            '& .media': {},
        },
    },
});
type Props = {
    crop: {
        x: number;
        y: number;
    };
    setCrop: (crop: { x: number; y: number }) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
    open: boolean;
    onClose: () => void;
    imgSrc: string;
    showCroppedImage: () => void;
    onMediaLoaded: (mediaSize: MediaSize) => void;
    minZoom: number;
};
const CropperModal: React.FC<Props> = ({
    crop,
    setCrop,
    onCropComplete,
    setZoom,
    zoom,
    open,
    onClose,
    imgSrc,
    showCroppedImage,
    onMediaLoaded,
    minZoom,
}) => {
    const classes = useStyles();
    return (
        <Modal open={open} onClose={onClose} className={classes.root}>
            <div className={classes.modal}>
                <div className="crop-container">
                    <div className="crop-space">
                        <Cropper
                            image={imgSrc}
                            crop={crop}
                            zoom={zoom}
                            minZoom={minZoom}
                            maxZoom={minZoom + 3}
                            aspect={ASPECT_RATIO}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropSize={{
                                width: CROP_WIDTH,
                                height: CROP_WIDTH / ASPECT_RATIO,
                            }}
                            classes={{
                                containerClassName: 'container',
                                cropAreaClassName: 'crop-area',
                                mediaClassName: 'media',
                            }}
                            onMediaLoaded={onMediaLoaded}
                            showGrid={false}
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button className="" onClick={onClose}>
                        Close
                    </button>
                    <button
                        className=""
                        onClick={() => {
                            onClose();
                            showCroppedImage();
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default CropperModal;
