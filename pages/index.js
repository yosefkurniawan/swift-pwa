import dynamic from 'next/dynamic';
import { modules } from '@config';

const Page = dynamic(() => ((!modules.checkout.checkoutOnly)
    ? import('@core_modules/home/pages/default')
    : import('@core_modules/checkout/pages/default')));

export default Page;
