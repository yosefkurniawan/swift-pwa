import React from 'react';
import Link from 'next/link';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import { GRAY_SECONDARY } from '@theme_color';

const MagezonFanspage = (props) => {
    const { page_url } = props;
    const styles = useStyles(props);
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Link href={page_url} color="inherit" underline="none">
                <div className="fb-wrapper">
                    <FacebookIcon
                        style={{
                            width: 50,
                            height: 50,
                            color: 'blue',
                        }}
                    />
                    <div className="fb-desc">
                        <Typography variant="span" letter="capitalize" size="14">
                            {t('common:facebook:page')}
                        </Typography>
                        <Typography variant="p" size="12" style={{ color: GRAY_SECONDARY, fontStyle: 'italic' }}>
                            {t('common:facebook:pageUrl')}
                            {' '}
                            {page_url}
                        </Typography>
                    </div>
                </div>
            </Link>
            <style jsx global>
                {`
                    .fb-wrapper {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        height: 55px;
                    }
                    .fb-desc {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonFanspage;
