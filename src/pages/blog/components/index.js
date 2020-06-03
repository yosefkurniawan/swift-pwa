/* eslint-disable no-nested-ternary */
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { getBlog } from '../services/graphql';
import useStyles from '../style';
import ItemListBlog from './ItemListBlog';
import Loader from './LoaderList';

const Blog = ({ t }) => {
    const styles = useStyles();
    const [filter] = React.useState({
        category_id: null,
    });

    const { loading, data, error } = getBlog(filter);
    if (loading || !data) return <Loader />;
    if (error) {
        return (
            <div className={styles.container}>
                <Alert className="m-15" severity="error">
                    {error.message.split(':')[1]}
                </Alert>
            </div>
        );
    }
    let blogs = [];

    if (data) {
        if (data.getBlogByFilter.data.length === 0) {
            return (
                <div className={styles.container}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:notFound')}
                    </Alert>
                </div>
            );
        }
        blogs = data.getBlogByFilter.data;
    }
    return (
        <div className={styles.container}>
            {blogs.length > 0
                && blogs.map((blog, index) => (
                    <ItemListBlog key={index} {...blog} />
                ))}
        </div>
    );
};

export default Blog;
