/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Breadcrumbs, makeStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@components/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Router from 'next/router';

const useStyles = makeStyles({
    root: {
        marginBottom: 20,
    },
});

export default ({ data = [], variant = 'text' }) => {
    const handleClick = (url) => {
        Router.push(
            '/[...slug]',
            `${url}`,
        );
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={styles.root}>
            <Link color="secondary" onClick={() => Router.push('/')} className={styles.home}>
                <Typography variant="p">Home</Typography>
            </Link>
            {
                variant === 'chip' ? data.map(({ label, link, active }, index) => (
                    <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link)} key={index}>
                        <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                    </Link>
                ))
                    : data.map(({ label, link, active }, index) => (
                        <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link)} key={index}>
                            <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};
