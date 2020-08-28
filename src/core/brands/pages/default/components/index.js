import { breakPointsUp } from '@helpers/theme';
import AllBrands from './all';
import Featured from './featured';

const Component = (props) => {
    const { t, featured } = props;
    const desktop = breakPointsUp('sm');
    return (
        <>
            <Featured t={t} featured={featured} desktop={desktop} />
            <AllBrands {...props} />
        </>
    );
};

export default Component;
