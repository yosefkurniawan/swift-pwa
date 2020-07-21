import React from 'react';
import Typography from '@Typography';
import Button from '@Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Router from 'next/router';
import useStyles from './style';

const SubCategory = ({
    open, data, setOpenModal, onBack,
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
                    <Button
                        variant="text"
                        onClick={() => {
                            setOpenModal(false);
                            setTimeout(() => {
                                Router.push(
                                    '/[...slug]',
                                    `/${data[0].url_path}`,
                                );
                            }, 300);
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
                                    setOpenModal(false);
                                    setTimeout(() => {
                                        Router.push(
                                            '/[...slug]',
                                            `/${item.url_path}`,
                                        );
                                    }, 300);
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
