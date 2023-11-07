/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Typography from '@common_typography';
import { useTranslation } from 'next-i18next';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import classNames from 'classnames';
import { setResolver, getResolver } from '@helper_localstorage';
import Link from 'next/link';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import useStyles from '@common_spancategory/style';
import Thumbor from '@common_image';

const handleClick = async (link, id) => {
    const urlResolver = getResolver();
    urlResolver[link] = {
        type: 'CATEGORY',
        id,
    };
    await setResolver(urlResolver);
};

const SpanCategory = (props) => {
    const {
        imageSrc, name, description, url, right = false, id, storeConfig = {},
    } = props;
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const urlDest = new URL(getStoreHost(getAppEnv()));
    let UrlString = '';
    if (imageSrc.toLowerCase().indexOf(urlDest.hostname) === -1) {
        UrlString = urlDest.hostname + imageSrc;
    } else {
        UrlString = imageSrc;
    }

    let imageWidth = storeConfig?.pwa?.image_category_width;
    let imageHeight = storeConfig?.pwa?.image_category_height;

    imageWidth = typeof imageWidth === 'string' ? parseInt(imageWidth, 10) : imageWidth;
    imageHeight = typeof imageHeight === 'string' ? parseInt(imageHeight, 10) : imageHeight;

    return (
        <div className={styles.container}>
            <div className={classNames('row center middle-sm', right ? 'reverse' : '')}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Link
                        href="/[...slug]"
                        as={`/${url}`}
                        onClick={() => handleClick(`/${url}`, id)}
                    >

                        <Thumbor
                            src={setDefaultWhenEmpty(UrlString)}
                            alt={name}
                            style={{
                                width: '100%',
                                maxWidth: '100%',
                                maxHeight: '100% !important',
                            }}
                            quality={80}
                            width={imageWidth}
                            height={imageHeight}
                            lazy
                        />

                    </Link>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className={styles.contentContainer}>
                        <Link
                            href="/[...slug]"
                            as={`/${url}`}
                            onClick={() => handleClick(`/${url}`, id)}
                        >

                            <Typography variant="title" type="bold" align="center">
                                {name}
                            </Typography>

                        </Link>
                        <Typography size="12" align="center">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                        <Link
                            href="/[...slug]"
                            as={`/${url}`}
                            onClick={() => handleClick(`/${url}`, id)}
                        >

                            <Typography variant="span" type="bold" className={styles.textBtn}>
                                {t('common:button:shop')}
                            </Typography>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpanCategory;
