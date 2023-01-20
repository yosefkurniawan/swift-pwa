import React from 'react';
import Link from 'next/link';
import useStyles from '@core_modules/seller/pages/default/components/style';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function EtalaseDesktop({ t, data, route }) {
    const styles = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={styles.etalaseContainer}>
            <div className="etalase-content">
                <Typography variant="label" type="bold" size="14">
                    {t('seller:storeFront')}
                </Typography>
                {
                    data && (
                        <List>
                            <Link
                                href={{
                                    pathname: `/seller/${route.query.sellerId}/product`,
                                }}
                                key={0}
                            >
                                <a>
                                    <ListItem
                                        button
                                        selected={selectedIndex === 0}
                                        onClick={(event) => handleListItemClick(event, 0)}
                                    >
                                        <ListItemText>
                                            <Typography variant="label" type="regular" size="12">
                                                {t('seller:allProducts')}
                                            </Typography>
                                        </ListItemText>

                                    </ListItem>
                                </a>
                            </Link>
                            { data.map((list) => (
                                <Link
                                    href={{
                                        pathname: `/seller/${route.query.sellerId}/product`,
                                        query: { filter: list.entity_id },
                                    }}
                                    key={list.entity_id}
                                >
                                    <a>
                                        <ListItem
                                            button
                                            selected={selectedIndex === list.entity_id}
                                            onClick={(event) => handleListItemClick(event, list.entity_id)}
                                        >

                                            {
                                                list.image && (
                                                    <ListItemIcon><img src={list.image} alt={list.name} width="24px" /></ListItemIcon>
                                                )
                                            }
                                            <ListItemText>
                                                <Typography variant="label" type="regular" size="12">
                                                    {list.name}
                                                </Typography>
                                            </ListItemText>

                                        </ListItem>
                                    </a>
                                </Link>
                            ))}
                        </List>
                    )
                }
            </div>
        </div>
    );
}

export default EtalaseDesktop;
