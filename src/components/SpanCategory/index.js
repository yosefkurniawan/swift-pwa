import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Link from 'next/link';
import useStyles from './style';
import setDefaultWhenEmpty from '../../helpers/checkImageSrc';

const SpanCategory = ({
    imageSrc, name, description, url,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Grid container justify="center">
                <Grid item sm={12} md={12} lg={12}>
                    <Link href="[...slug]" as={url}>
                        <div className={styles.imageContainer}>
                            <img src={setDefaultWhenEmpty(imageSrc)} alt={name} style={{ maxWidth: '100%' }} />
                        </div>
                    </Link>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div className={styles.contentContainer}>
                        <Typography variant="title" type="bold" align="center">
                            {name}
                        </Typography>
                        <Typography size="12" align="center">
                            { /* eslint-disable-next-line react/no-danger */ }
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                        <Link href="[...slug]" as={url}>
                            <Typography
                                variant="span"
                                type="bold"
                                className={styles.textBtn}
                            >
                                SHOP NOW
                            </Typography>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SpanCategory;
