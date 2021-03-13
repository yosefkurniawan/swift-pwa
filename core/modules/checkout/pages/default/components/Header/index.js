import Link from 'next/link';
import PromoModalItem from '../PromoModalItem';

const HeaderCheckout = ({
    storeConfig,
    checkout,
    setCheckout,
    t,
}) => (
    <div id="header">
        <Link href="/">
            <img
                className="logo"
                src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                alt="logo"
            />
        </Link>
        <PromoModalItem
            t={t}
            storeConfig={storeConfig}
            checkout={checkout}
            setCheckout={setCheckout}
        />
        <style jsx>
            {`
                 #header {
                    height: 170px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                #header img {
                    cursor: pointer;
                    max-height: 125px;
                    width: auto;
                }
            `}
        </style>
    </div>
);

export default HeaderCheckout;
