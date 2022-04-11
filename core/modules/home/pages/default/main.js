import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';
import Content from '@core_modules/home/pages/default/components';
import Core from '@core_modules/home/pages/default/core';

const Page = (props) => (
    <Core
        ErrorInfo={ErrorInfo}
        Content={Content}
        {...props}
    />
);

export default Page;
