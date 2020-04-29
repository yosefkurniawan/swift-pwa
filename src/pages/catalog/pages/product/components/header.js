import Header from '@components/Header';
import ShoppingBagIcon from '@components/ShoppingBagIcon';

const CustomHeader = ({ pageConfig }) => (
    <Header
        pageConfig={pageConfig}
        RightComponent={(
            <ShoppingBagIcon />
        )}
    />
);

export default CustomHeader;
