/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import { features } from '@config';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import classNames from 'classnames';
import { setResolver } from '@helper_localstorage';
import Link from 'next/link';
import useStyles from './style';
import Thumbor from '../Image';

const SpanCategory = (props) => {
    const {
        imageSrc, name, description, url, right = false, id,
    } = props;
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const handleClick = async () => {
        await setResolver({
            id,
            type: 'CATEGORY',
        });
    };
    return (
        <div className={styles.container}>
            <div className={classNames('row center middle-sm', right ? 'reverse' : '')}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Link href="/[...slug]" as={`/${url}`}>
                        <a onClick={handleClick}>
                            <Thumbor
                                src={setDefaultWhenEmpty(imageSrc)}
                                alt={name}
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                quality={80}
                                width={features.imageSize.category.width}
                                height={features.imageSize.category.height}
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className={styles.contentContainer}>
                        <Link href="/[...slug]" as={`/${url}`}>
                            <a onClick={handleClick}>
                                <Typography variant="title" type="bold" align="center">
                                    {name}
                                </Typography>
                            </a>
                        </Link>
                        <Typography size="12" align="center">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                        <Link href="/[...slug]" as={`/${url}`}>
                            <a onClick={handleClick}>
                                <Typography variant="span" type="bold" className={styles.textBtn}>
                                    {t('common:button:shop')}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpanCategory;
