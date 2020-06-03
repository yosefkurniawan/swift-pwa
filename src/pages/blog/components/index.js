/* eslint-disable no-nested-ternary */
import React from 'react';
import { getBlog } from '../services/graphql';
import useStyles from '../style';
import ItemListBlog from './ItemListBlog';
import Loader from './LoaderList';

const Blog = () => {
    const styles = useStyles();
    const [filter] = React.useState({
        category_id: null,
    });

    const { loading, data, error } = getBlog(filter);
    if (loading || !data) return <Loader />;
    if (error) return <p>Error</p>;
    let blogs = [];

    if (data) {
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
