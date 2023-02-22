import React from 'react';
import Link from 'next/link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from '@core_modules/seller/pages/default/components/style';

function EtalaseMobile({
    noBanner, t, data, route,
}) {
    const [value, setValue] = React.useState(0);
    const styles = useStyles();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const url = !noBanner ? `/seller/${route.query.sellerId}/product` : `/seller/${route.query.sellerId}`;

    return (
        <div className={styles.etalaseSelect}>
            <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="label-etalase">{t('seller:storeFront')}</InputLabel>
                <Select
                    id="label-etalase"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    label="Etalase"
                >
                    <MenuItem value={0} key={0}>
                        <Link
                            href={{
                                pathname: url,
                            }}
                            key={0}
                        >
                            {t('seller:allProducts')}
                        </Link>
                    </MenuItem>
                    {
                        data && data.map((list) => (
                            <MenuItem value={list.entity_id} key={list.entity_id}>
                                <Link
                                    href={{
                                        pathname: url,
                                        query: { filter: list.entity_id },
                                    }}
                                    key={list.entity_id}
                                >
                                    {list.name}
                                </Link>
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default EtalaseMobile;
