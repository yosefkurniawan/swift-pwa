import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Slide, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Router from 'next/router';
import useStyles from './style';

const SubCategory = ({ open, data, onBack }) => {
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
                    <Button
                        variant="text"
                        onClick={() => {
                            Router.push(
                                '/[...slug]',
                                `/${data[0].url_path}`,
                            );
                        }}
                    >
                        {data[0].name}
                    </Button>
                </Typography>
                <div className={styles.item}>
                    {data[0].children.map((item, indx) => (
                        <Typography variant="span" letter="capitalize" align="center" key={indx}>
                            <Button
                                variant="text"
                                onClick={() => {
                                    Router.push(
                                        '/[...slug]',
                                        `/${item.url_path}`,
                                    );
                                }}
                            >
                                <Typography variant="span" letter="capitalize">
                                    {item.name}
                                </Typography>
                            </Button>
                        </Typography>
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
