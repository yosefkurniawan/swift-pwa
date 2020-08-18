import Router from 'next/router';
import { getCategories } from '../../../services/graphql';

const CoreTopNavigation = (props) => {
    const { Content, storeConfig } = props;
    const [value, setValue] = React.useState('');

    const { data, loading } = getCategories();

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    return (
        <Content
            category={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            value={value}
        />
    );
};

export default CoreTopNavigation;
