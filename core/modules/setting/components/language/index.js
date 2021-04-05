/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from '@i18n';
import { translation } from '@config';
import cookies from 'js-cookie';
import ViewLanguage from './view';

const COOKIES_APP_LANG = 'app_lang';

const SwitcherLanguage = (props) => {
    const { i18n, onCallbackLanguage } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const mount = useRef();

    const { languages, language } = i18n;
    const [lang, setLang] = useState({
        label: translation.languagesLabel[language],
        value: language,
    });

    const dataLang = [];
    if (languages && languages.length > 0) {
        languages.forEach((langItem) => {
            dataLang.push({
                label: translation.languagesLabel[langItem],
                value: langItem,
            });
        });
    }
    /**
     * [useEffect] life cycle react
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const getLangFromStorage = () => {
                // prettier-ignore
                const getDataCookies = cookies.get(COOKIES_APP_LANG) !== undefined
                    ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                    : {
                        label: translation.languagesLabel[language],
                        value: language,
                    };

                i18n.changeLanguage(getDataCookies.value);
                cookies.set(COOKIES_APP_LANG, getDataCookies);
                setLang(getDataCookies);
            };
            getLangFromStorage();
        }
        return () => (mount.current = false);
    }, []);

    /**
     * [METHOD] handle click popover
     * @param {*} event
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * [METHOD] handle close popover
     */
    const handleClose = () => setAnchorEl(null);

    /**
     * [METHOD] on click language
     */
    const onClickLanguage = ({ item }) => {
        i18n.changeLanguage(item.value);
        cookies.set(COOKIES_APP_LANG, item);
        setLang(item);
        handleClose();
        window.location.reload();
    };

    const propsOther = {
        id,
        open,
        anchorEl,
        dataLang,
        lang,
        onCallbackLanguage,
        handleClick,
        handleClose,
        onClickLanguage,
    };

    return <ViewLanguage {...props} {...propsOther} />;
};

export default withTranslation()(SwitcherLanguage);
