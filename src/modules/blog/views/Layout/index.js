import Divider from '@material-ui/core/Divider';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import propTypes from 'prop-types';

const Layout = ({ children, pageConfig, ...other }) => {
    const handleBack = () => {
        Router.back();
    };
    return (
        <div className="column">
            <div className="row">
                <IconButton onClick={handleBack}>
                    <BackIcon />
                </IconButton>
                <h3>{pageConfig.title || other.t('blog:title')}</h3>
            </div>
            <Divider />
            {React.isValidElement(children) && React.cloneElement(children, { ...other })}
        </div>
    );
};

Layout.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: propTypes.any.isRequired,
};

export default Layout;
