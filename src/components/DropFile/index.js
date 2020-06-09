import Typography from '@components/Typography';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useMemo } from 'react';
import Message from '@components/Toast';
import { useTranslation } from '@i18n';

const DropFile = ({
    label = 'Upload Files',
    title = '',
    showListFile = true,
    acceptedFile = 'image/*,.pdf,.doc,.docx,xls,xlsx,.zip,.rar',
    maxSize = 2000000,
    multiple = true,
}) => {
    const { t } = useTranslation(['common']);
    const [dropFile, setDropFile] = React.useState([]);
    const [openError, setOpenError] = React.useState(false);
    const onDrop = useCallback((param) => {
        if (param && param.length > 0) {
            const files = multiple ? dropFile : [];
            files.push(param[0].name);
            setDropFile(files);
        }
        // Do something with the files
    }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: acceptedFile,
        onDropRejected: () => setOpenError(true),
        maxSize,
    });

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        breturnWidth: 2,
        breturnRadius: 2,
        breturnColor: '#eeeeee',
        breturnStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'breturn .24s ease-in-out',
    };

    const activeStyle = {
        breturnColor: '#2196f3',
    };

    const acceptStyle = {
        breturnColor: '#00e676',
    };

    const rejectStyle = {
        breturnColor: '#ff1744',
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [
        isDragActive,
        isDragReject,
        isDragAccept,
    ]);

    const messageError = `${t('common:fileUpload:reject') + acceptedFile}& max file ${maxSize / 1000000}Mb`;

    return (
        <div className="column">
            <Message autoHideDuration={6000} open={openError} variant="error" setOpen={() => setOpenError(false)} message={messageError} />
            {
                title && title !== '' ? (<Typography variant="label" type="semiBold">{title}</Typography>)
                    : null
            }
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {
                    isDragActive
                        ? <p>{t('common:fileUpload:dragActive')}</p>
                        : <p>{t('common:fileUpload:dragNonActive')}</p>
                }
            </div>
            <Typography>{label}</Typography>
            <div className="column">
                {
                    showListFile && dropFile.map((file, index) => (<Typography key={index}>{file}</Typography>))
                }
            </div>
        </div>
    );
};

export default DropFile;
