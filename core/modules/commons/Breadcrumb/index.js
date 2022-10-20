/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@common_typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { setResolver, getResolver } from '@helper_localstorage';

const useStyles = makeStyles({
    root: {
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
        marginBottom: 20,
    },
});

const CustomBreadcrumb = ({ data = [], variant = 'text' }) => {
    const handleClick = async (url, id) => {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} className={styles.root}>
            <Link color="secondary" href="/" className={styles.home}>
                <a>
                    <Typography variant="p">Home</Typography>
                </a>
            </Link>
            {
                variant === 'chip' ? data.map(({
                    label, link, active, id,
                }, index) => (
                    <Link href={`${link}`} passHref color={active ? 'primary' : 'secondary'} key={index}>
                        <a onClick={() => handleClick(link, id)}>
                            <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                        </a>
                    </Link>
                ))
                    : data.map(({
                        label, link, active, id,
                    }, index) => (
                        <Link
                            color={active ? 'primary' : 'secondary'}
                            href={link}
                            onClick={index === data.length - 1 ? () => {} : () => handleClick(link, id)}
                            key={index}
                        >
                            <a>
                                <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                            </a>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};

const BreadcrumbsComp = (props) => (
    <CustomBreadcrumb {...props} />
);

export default BreadcrumbsComp;
