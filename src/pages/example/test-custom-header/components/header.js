import Header from '@components/Header';
import Typography from '@components/Typography';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import useStyles from '../style';

const HeaderLeftComponent = () => {
    const styles = useStyles();
    const route = useRouter;
    const back = () => {
        route.back();
    };
    return (
        <Button onClick={back}>
            <CloseIcon className={styles.iconClose} />
        </Button>
    );
};

const HeaderCenterComponent = () => (
    <Typography variant="title" type="bold" letter="uppercase">
        Custom Header
    </Typography>
);

const CustomHeader = () => (
    <Header
        LeftComponent={<HeaderLeftComponent />}
        CenterComponent={<HeaderCenterComponent />}
    />
);

export default CustomHeader;
