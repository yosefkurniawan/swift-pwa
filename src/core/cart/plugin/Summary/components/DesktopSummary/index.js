/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatPrice } from '@helpers/currency';
import classNames from 'classnames';

import useStyles from './style';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => {}, loading, disabled,
        showItems = false, items = [],
    } = props;
    const styles = useStyles();
    const [top, setTop] = React.useState(0);
    const [openItem, setOpenItem] = React.useState(false);
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (window.pageYOffset > 100) {
                        header.classList.add('header-small');
                    } else {
                        header.classList.remove('header-small');
                    }
                }
                if (window.pageYOffset > 50) {
                    setTop(window.pageYOffset + 100);
                } else {
                    setTop(window.pageYOffset);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, top]);

    return (
        <div className={styles.container} style={{ top }}>
            <Typography variant="h1" type="regular" letter="capitalize">
                Summary
            </Typography>
            {
                showItems ? (
                    <>
                        <div className={classNames('row between-xs')} onClick={() => setOpenItem(!openItem)}>
                            <div className="col-xs-6">
                                <Typography variant="span">{`${items.length} items in Cart`}</Typography>
                            </div>
                            <div className="col-xs-2">
                                {
                                    openItem ? (<ExpandLess />) : (<ExpandMore />)
                                }
                            </div>
                        </div>
                        {
                            openItem ? (
                                <div className={classNames('row')}>
                                    {
                                        items.map((item, index) => (
                                            <div className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)} key={index}>
                                                <div className="col-xs-4">
                                                    <img src={item.product.small_image.url} alt={item.product.name} className={styles.imgProduct} />
                                                </div>
                                                <div className={classNames('col-xs-8', styles.bodyProductItem)}>
                                                    <Typography variant="span">{item.product.name}</Typography>
                                                    <div className="flex-grow" />
                                                    <Typography variant="span">{`${t('common:title:shortQty')} : ${item.quantity}`}</Typography>
                                                    <Typography variant="span" size="14" letter="uppercase">
                                                        {formatPrice(item.prices.price.value, item.prices.price.currency)}
                                                    </Typography>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </>
                )
                    : null
            }
            <List>
                {
                    summary.data.map((dt, index) => (
                        <ListItem className={styles.list} key={index}>
                            <ListItemText className={styles.labelItem} primary={<Typography variant="span">{dt.item}</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="span" type="regular">
                                    {dt.value}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
                <ListItem className={styles.list}>
                    <ListItemText primary={<Typography variant="title" type="bold">Total</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="title" type="bold">
                            {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency) : null}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Button loading={loading} disabled={disabled} className={styles.btnCheckout} onClick={handleActionSummary}>
                {t('common:button:checkout')}
            </Button>
        </div>
    );
};

export default Summary;
