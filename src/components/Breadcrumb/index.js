import { Link, Breadcrumbs } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@components/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Router from 'next/router';


export default ({ data = [], variant = 'chip' }) => {
    const handleClick = (url) => {
        Router.push(
            '/[...slug]',
            `${url}`,
        );
    };
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            {
                variant === 'chip' ? data.map(({ label, link, active }, index) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link)} key={index}>
                        <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                    </Link>
                ))
                    : data.map(({ label, link, active }, index) => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link)} key={index}>
                            <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};
