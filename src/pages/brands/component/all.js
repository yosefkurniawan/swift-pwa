/* eslint-disable no-param-reassign */
import Typography from '@components/Typography';
import GridList from '@components/GridList';
import Link from 'next/link';
import useStyles from './style';

const Item = (props) => {
    const styles = useStyles();
    const { group, children } = props;
    return (
        <div>
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
            >
                {group}
                <ul>
                    {children.map((val, idx) => (
                        <li key={idx} className={styles.listBrand}>
                            {val.category_url ? (
                                <Link href="/[...slug]" as={`/${val.category_url.replace('.html', '')}`}>
                                    <a>{val.name}</a>
                                </Link>
                            ) : val.name}

                        </li>
                    ))}
                </ul>
            </Typography>
        </div>
    );
};

const AllBrands = ({ data = [] }) => {
    const styles = useStyles();
    const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const brandA = a.name.toUpperCase();
        const brandB = b.name.toUpperCase();

        let comparison = 0;
        if (brandA > brandB) {
            comparison = 1;
        } else if (brandA < brandB) {
            comparison = -1;
        }
        return comparison;
    };

    data = data.sort(compare);

    let brands = data.reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
    }, {});
    brands = Object.values(brands);
    return (
        <>
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
                className={styles.title}
            >
                All Brands
            </Typography>
            <GridList
                data={brands}
                ItemComponent={Item}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            />
        </>
    );
};

export default AllBrands;
