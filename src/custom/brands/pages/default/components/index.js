import Featured from '@core_modules/brands/pages/default/components/featured';

const BrandsTemplate = (props) => {
    const { t, featured, all } = props;
    return (
        <>
            <Featured t={t} featured={featured} />
            {all.map((val, idx) => (
                <div key={idx}>
                    <h3>{val.group}</h3>
                    <ul>
                        {val.children.map((child, idc) => <li key={idc}>{child.name}</li>)}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default BrandsTemplate;
