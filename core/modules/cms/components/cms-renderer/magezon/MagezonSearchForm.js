import React from 'react';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import Router from 'next/router';
import { useTranslation } from '@i18n';

const MagezonSearchForm = () => {
    const [value, setValue] = React.useState('');
    const { t } = useTranslation();
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
        <div className="header-middle__search">
            <Autocomplete setValue={setValue} handleSearch={handleSearch} OptionsItem={OptionAutocomplete} t={t} />
            <div className="search-icon">
                <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                    <SearchIcon />
                </IconButton>
            </div>
            <style global jsx>
                {`
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                        background: #fff;
                        z-index: 9;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: left;
                        position: relative;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSearchForm;
