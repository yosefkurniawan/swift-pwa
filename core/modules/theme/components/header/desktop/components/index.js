/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';

const NavbarV1 = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1'));
const NavbarV2 = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v2'));
const NavbarV3 = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v3'));
const NavbarV4 = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v4'));

const ViewTopNavigation = (props) => {
    const { storeConfig } = props;
    let content = <></>;

    if (storeConfig && storeConfig.pwa) {
        if (storeConfig.pwa.header_version === 'v1') {
            content = <NavbarV1 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v2') {
            content = <NavbarV2 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v3') {
            content = <NavbarV3 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v4') {
            content = <NavbarV4 {...props} />;
        }
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default ViewTopNavigation;
