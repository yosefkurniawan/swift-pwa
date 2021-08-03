import React from 'react';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import Router from 'next/router';
import { useTranslation } from '@i18n';

const MagezonSearchForm = (props) => {
    const [value, setValue] = React.useState('');
    const {
        input_background_color, placeholder, input_text_color, form_width,
    } = props;
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
            <Autocomplete
                width={Number(form_width) - 10}
                placeholder={placeholder}
                setValue={setValue}
                handleSearch={handleSearch}
                OptionsItem={OptionAutocomplete}
                t={t}
            />
            <div className="search-icon">
                <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                    <SearchIcon />
                </IconButton>
            </div>
            <style jsx>
                {`
                    .search-icon {
                        position: absolute;
                        right: 0;
                        top: 7px;
                        background-color: ${input_background_color || '#fff'};
                        color: ${input_text_color};
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: left;
                        position: relative;
                        background-color: ${input_background_color};
                        width: ${form_width}px;
                        padding-top: 10px;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .header-middle__search input {
                        color: ${input_text_color};
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSearchForm;
