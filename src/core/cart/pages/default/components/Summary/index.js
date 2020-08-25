import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '@helpers/currency';

import useStyles from './style';

const Summary = (props) => {
    const {
        t, summary,
    } = props;
    const styles = useStyles();
    const [top, setTop] = React.useState(0);
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
            <List>
                {
                    summary.data.map((dt, index) => (
                        <ListItem className={styles.list} key={index}>
                            <ListItemText primary={<Typography variant="span">{dt.item}</Typography>} />
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
            <Button className={styles.btnCheckout}>
                {t('common:button:checkout')}
            </Button>
        </div>
    );
};

export default Summary;
