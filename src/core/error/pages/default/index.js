import Core from './core';
import Content from './components';

const Error = (props) => <Core {...props} Content={Content} />;

Error.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default Error;
