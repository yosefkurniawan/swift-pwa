import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Typography from '@common_typography';

const style = {
    margin: 20,
};

const Error = ({ counter }) => {
    const [countDown, setCountDown] = useState(counter);

    useEffect(() => {
        setTimeout(() => {
            if (countDown > 0) {
                setCountDown(countDown - 1);
            } else {
                window.backdropLoader(true);
            }
        }, 1000);
    });
    return (
        <div>
            <Alert severity="error" style={style}>
                <AlertTitle>Something went wrong.</AlertTitle>
                <Typography variant="inherit">
                    You will be redirected back to the store in
                    {' '}
                    <strong>{countDown}</strong>
                </Typography>
            </Alert>
        </div>
    );
};

export default Error;
