import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
    linearProgressWrapper: {
        position: 'fixed',
        width: '100%',
        left: '0',
        top: '0',
        zIndex: '1200',
    },
}));

const PageProgressLoader = () => {
    const styles = useStyles();
    const [progress, setProgress] = useState();
    const [show, setShow] = useState(false);
    let timer = null;

    const handleRouteChangeStart = () => {
        // console.log('Router change start');
        setProgress(0);
        setShow(true);
        timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                let newProgress;
                if (oldProgress + diff > 90) {
                    newProgress = 90;
                } else {
                    newProgress = oldProgress + diff;
                }

                return Math.min(newProgress, 90);
            });
        }, 500);
    };

    const handleRouteChangeComplete = (_, { scroll }) => {
        if (scroll) {
            window.scrollTo(0, 0);
        }
        const sessionCurrentUrl = sessionStorage.getItem('currentUrl');
        const prevUrl = sessionCurrentUrl && sessionCurrentUrl !== Router.asPath
            ? sessionCurrentUrl
            : '/';
        sessionStorage.setItem('prevUrl', prevUrl);
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('currentUrl', Router.asPath);
        }, 2000);
    };

    const handleRouteChangeError = () => {
        // console.log('Router change Error');
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
        }, 500);
    };

    useEffect(() => {
        sessionStorage.setItem('prevUrl', '/');
        sessionStorage.setItem('currentUrl', Router.asPath);
        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);
        Router.events.on('RouteChangeError', handleRouteChangeError);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.linearProgressWrapper}>
            {show ? <LinearProgress variant="determinate" value={progress} color="secondary" /> : null}
        </div>
    );
};

export default PageProgressLoader;
