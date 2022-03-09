import Core from '@core_modules/catalog/pages/category/core';
import { withTranslation } from '@i18n';

const CategoryPage = (props) => (
    <Core
        {...props}
    />
);

export default withTranslation()(CategoryPage);
