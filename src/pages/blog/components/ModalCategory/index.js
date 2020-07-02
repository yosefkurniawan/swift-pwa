/* eslint-disable consistent-return */
import {
    Dialog, Slide, Grid,
} from '@material-ui/core';
import React from 'react';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';
import Button from '@components/Button';
import Header from '@components/Header';
import Router from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { getCategory } from '../../services/graphql/index';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const CategoryWrapperSkeleteon = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            style={{ alignSelf: 'center', marginBottom: '32px' }}
            variant="rect"
            width={width}
            height={16}
            animation="wave"
        />
    );
    return (
        <div style={{ width: '100%', marginTop: '36px' }}>
            <Grid container direction="column" alignItems="center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </Grid>
        </div>
    );
};

const ListCategory = ({ setOpen, t }) => {
    const styles = useStyles();
    const { data, loading, error } = getCategory({ category_id: 0 });
    if (loading) return <CategoryWrapperSkeleteon />;
    if (error) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="error">{t('commong:error:fetchError')}</Alert>
            </div>
        );
    }
    if (!data || data.getBlogCategory.data.length === 0) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="warning">{t('common:error:notFound')}</Alert>
            </div>
        );
    }
    if (!loading && data && data.getBlogCategory.data.length > 0) {
        const handleClick = (item) => {
            Router.push(
                '/blog/category/[id]',
                `/blog/category/${item.url_key}`,
            );
            setOpen();
        };
        return (
            <div className={styles.body}>
                <div className={styles.item}>
                    <Button
                        variant="text"
                        onClick={() => Router.push('/blog')}
                    >

                        <Typography type="semiBold" variant="title" align="center">
                            All
                        </Typography>
                    </Button>
                    {
                        data.getBlogCategory.data.map((item, key) => (
                            <Button
                                variant="text"
                                onClick={() => handleClick(item)}
                                key={key}
                            >

                                <Typography type="semiBold" variant="title" align="center">
                                    {item.name}
                                </Typography>
                            </Button>
                        ))
                    }
                </div>
            </div>
        );
    }
};

const ModalCategory = ({
    open, setOpen, t,
}) => {
    const styles = useStyles();
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
        >
            <div className={styles.container}>
                <Header
                    LeftComponent={{
                        onClick: setOpen,
                    }}
                    pageConfig={{
                        headerTitle: t('common:title:category'),
                        header: 'relative',
                    }}
                />
                {
                    open && (<ListCategory setOpen={setOpen} t={t} />)
                }
            </div>
        </Dialog>
    );
};

export default ModalCategory;
