import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@Typography';
import Link from 'next/link';
import { useTranslation } from '@i18n';
import { imageSize } from '@config';
import useStyles from './style';
import setDefaultWhenEmpty from '../../helpers/checkImageSrc';
import Thumbor from '../Image';

const SpanCategory = ({
    imageSrc, name, description, url,
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Link href="[...slug]" as={url}>
                        <a>
                            <Thumbor
                                src={setDefaultWhenEmpty(imageSrc)}
                                alt={name}
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                quality={80}
                                width={imageSize.category.width}
                                height={imageSize.category.height}
                            />
                        </a>
                    </Link>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div className={styles.contentContainer}>
                        <Typography variant="title" type="bold" align="center">
                            {name}
                        </Typography>
                        <Typography size="12" align="center">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                        <Link href="[...slug]" as={url}>
                            <a>
                                <Typography variant="span" type="bold" className={styles.textBtn}>
                                    {t('common:button:shop')}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SpanCategory;
