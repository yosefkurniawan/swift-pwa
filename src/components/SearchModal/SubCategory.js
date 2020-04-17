import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Slide, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Router from 'next/router';
import useStyles from './style';

const SubCategory = ({
    open, data, onBack,
}) => {
    const styles = useStyles();
    return (
        <Slide
            direction="left"
            in={open}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.body}>
                <Typography variant="h1" align="center">
                    {data[0].name}
                </Typography>
                <div className={styles.item}>
                    {data[0].children.map((item, indx) => (
                        <Button
                            key={indx}
                            variant="text"
                            capitalize
                            onClick={() => {
                                Router.push(
                                    '/category/[id]',
                                    `/category/${item.url_key.toLowerCase()}`,
                                );
                            }}
                        >
                            <Typography variant="span">{item.name}</Typography>
                        </Button>
                    ))}
                </div>
                <IconButton onClick={() => onBack()}>
                    <ArrowBack />
                </IconButton>
            </div>
        </Slide>
    );
};

export default SubCategory;
