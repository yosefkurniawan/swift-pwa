import Router from 'next/router';

const CoreTopNavigation = (props) => {
    const { Content, storeConfig } = props;
    const [value, setValue] = React.useState('');

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
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            value={value}
        />
    );
};

export default CoreTopNavigation;
