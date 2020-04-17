import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Slide } from '@material-ui/core';
import useStyles from './style';

const Category = ({
    open,
    data,
    onClick,
    direction = 'left',
    slide = false,
}) => {
    const styles = useStyles();

    const content = () => (
        <div className={styles.body}>
            <div className={styles.item}>
                {data.length
                    ? data.map((catlvl1, index) => (
                        <>
                            <Typography key={index} variant="h1" align="center">
                                {catlvl1.name}
                            </Typography>
                            {catlvl1.children.map((catlvl2, indx) => (
                                <Button
                                    key={indx}
                                    variant="text"
                                    capitalize
                                    onClick={() => onClick(catlvl2)}
                                >
                                    <Typography variant="span">{catlvl2.name}</Typography>
                                </Button>
                            ))}
                        </>
                    ))
                    : null}
            </div>
        </div>
    );

    if (slide === true) {
        return (
            <Slide
                direction={direction}
                in={open}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                {content()}
            </Slide>
        );
    }
    return <>{content()}</>;
};

export default Category;
