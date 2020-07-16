import AllBrands from './all';
import Featured from './featured';

const Component = (props) => {
    const { t, featured } = props;
    return (
        <>
            <Featured t={t} featured={featured} />
            <AllBrands {...props} />
        </>
    );
};

export default Component;
