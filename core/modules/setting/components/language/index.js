/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from '@i18n';
import { translation, selectLanguageCookie, selectStoreCookie } from '@config';
import cookies from 'js-cookie';
import Skeleton from '@material-ui/lab/Skeleton';
import { getStores } from '../../services/graphql';
import ViewLanguage from './view';

const COOKIES_APP_LANG = selectLanguageCookie;
const COOKIES_SELECT_STORE = selectStoreCookie;

const SwitcherLanguage = (props) => {
    const { i18n, onCallbackLanguage } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // get stores
    const { loading, data } = getStores();
    if (loading) {
        return (
            <div>
                {props.title && <Skeleton style={{ padding: 0 }} variant="rect" width={100} height={10} />}
                <Skeleton style={{ display: 'inline-block', padding: 0 }} variant="rect" width={100} height={10} />
            </div>
        );
    }

    const id = open ? 'simple-popover' : undefined;
    const mount = useRef();

    const { languages, language } = i18n;
    const [lang, setLang] = useState({
        label: translation.languagesLabel[language],
        value: language,
    });

    const dataLang = [];
    languages.forEach((langItem) => {
        dataLang.push({
            label: translation.languagesLabel[langItem],
            value: langItem,
        });
    });

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
    const onClickLanguage = async ({ item }) => {
        if (data && data.availableStores && data.availableStores.length > 0) {
            const selectStore = data.availableStores.find((store) => store.locale.match(item.value));

            if (selectStore && selectStore.code) {
                await cookies.set(COOKIES_SELECT_STORE, selectStore.code);
            } else {
                await cookies.remove(COOKIES_SELECT_STORE);
            }
        }
        await i18n.changeLanguage(item.value);
        await cookies.set(COOKIES_APP_LANG, item);
        setLang(item);
        handleClose();
        // window.location.reload();
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
