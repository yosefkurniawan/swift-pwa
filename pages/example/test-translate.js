/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

import { i18n, Link, withTranslation } from '@i18n';

const TestTranslate = ({ t }) => (
    <>
        <main>
            <div>
                <button
                    type="button"
                    onClick={() => i18n.changeLanguage(
                        i18n.language === 'en' ? 'id' : 'en',
                    )}
                >
                    {t('change-locale')}
                </button>
                {/* get translation from default namespace ("example") */}
                <p>{t('testText1')}</p>

                {/* get translation from another namespace ("common") */}
                <p>{t('common:variant')}</p>

                <Link href="#">
                    <button type="button">{t('to-second-page')}</button>
                </Link>
            </div>
        </main>
    </>
);

TestTranslate.getInitialProps = async () => ({
    namespacesRequired: ['common', 'example'],
});

TestTranslate.propTypes = {
    t: PropTypes.func.isRequired,
};

/* set "example" as default namespace. leave the parameter withTranslation() blank to unset default namespace */
export default withTranslation('example')(TestTranslate);
