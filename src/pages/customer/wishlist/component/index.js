// Library
import React from 'react';
import {
    IconButton, Toolbar, Button, Card, CardContent, CardMedia,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import useStyles from './style';

// Main Render Page
const Content = () => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.wishlistWrapper}>
                <Card className={styles.card}>
                    <CardMedia image="https://via.placeholder.com/300" className={styles.cardImage} />
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardProductDetails}>
                            <p>Product Name</p>
                            <p>IDR 999.000</p>
                            <Button
                                variant="contained"
                                className={[styles.productAddToCart].join(' ')}
                            >
                                Add To Bag
                            </Button>
                        </div>
                        <div className={styles.cardProductAction}>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardMedia image="https://via.placeholder.com/300" className={styles.cardImage} />
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardProductDetails}>
                            <p>Product Name</p>
                            <p>IDR 999.000</p>
                            <Button
                                variant="contained"
                                className={[styles.productAddToCart].join(' ')}
                            >
                                Add To Bag
                            </Button>
                        </div>
                        <div className={styles.cardProductAction}>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardMedia image="https://via.placeholder.com/300" className={styles.cardImage} />
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardProductDetails}>
                            <p>Product Name</p>
                            <p>IDR 999.000</p>
                            <Button
                                variant="contained"
                                className={[styles.productAddToCart].join(' ')}
                            >
                                Add To Bag
                            </Button>
                        </div>
                        <div className={styles.cardProductAction}>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardMedia image="https://via.placeholder.com/300" className={styles.cardImage} />
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardProductDetails}>
                            <p>Product Name</p>
                            <p>IDR 999.000</p>
                            <Button
                                variant="contained"
                                className={[styles.productAddToCart].join(' ')}
                            >
                                Add To Bag
                            </Button>
                        </div>
                        <div className={styles.cardProductAction}>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardMedia image="https://via.placeholder.com/300" className={styles.cardImage} />
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardProductDetails}>
                            <p>Product Name</p>
                            <p>IDR 999.000</p>
                            <Button
                                variant="contained"
                                className={[styles.productAddToCart].join(' ')}
                            >
                                Add To Bag
                            </Button>
                        </div>
                        <div className={styles.cardProductAction}>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Toolbar>
                    <Button
                        variant="contained"
                        className={[styles.productAddAllToCart].join(' ')}
                    >
                        <span>
                            Add All to Bag
                        </span>
                    </Button>
                </Toolbar>
            </div>
        </>
    );
};

export default Content;
