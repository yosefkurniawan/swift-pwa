import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: theme.zIndex.drawer + 3,
    },
}));

function ScrollTop({ storeConfig }) {
    const classes = useStyles();
    const [triger, setTriger] = React.useState(false);
    const maxHeigtToShow = 600;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const headerInner = document.getElementById('header-inner');
            const checkScrollTop = () => {
                // handle show hide header
                if (storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && header) {
                    if (window.pageYOffset > 100) {
                        header.classList.add('header-small');
                        if (headerInner) {
                            headerInner.classList.add('header-inner');
                        }
                    } else {
                        header.classList.remove('header-small');
                        if (headerInner) {
                            headerInner.classList.remove('header-inner');
                        }
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, triger]);

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Zoom in={triger}>
            <div onClick={scrollTop} role="presentation" className={classes.root}>
                <Fab color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </Zoom>
    );
}

export default ScrollTop;
