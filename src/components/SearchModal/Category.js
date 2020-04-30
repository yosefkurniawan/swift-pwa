import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Slide } from '@material-ui/core';
import Router from 'next/router';
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
                        <div key={index} className="column">
                            <Typography variant="h1" align="center">
                                <Button
                                    variant="text"
                                    onClick={() => Router.push(
                                        '/[...slug]',
                                        `/${catlvl1.url_key}`,
                                    )}
                                >
                                    {catlvl1.name}
                                </Button>
                            </Typography>
                            {catlvl1.children.map((catlvl2, indx) => (
                                <Typography
                                    variant="span"
                                    letter="capitalize"
                                    align="center"
                                >
                                    <Button
                                        variant="text"
                                        onClick={() => onClick(catlvl2)}
                                        key={indx}
                                    >
                                        <Typography
                                            variant="span"
                                            letter="capitalize"
                                        >
                                            {catlvl2.name}
                                        </Typography>


                                    </Button>
                                </Typography>
                            ))}
                        </div>
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
