import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import Slide from '@material-ui/core/Slide';
import Router from 'next/router';
import { showBrandPage } from '@config';
import useStyles from './style';

const Category = ({
    open,
    setOpenModal,
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
                                    onClick={() => {
                                        setOpenModal(false);
                                        setTimeout(() => {
                                            Router.push(
                                                '/[...slug]',
                                                `/${catlvl1.url_key}`,
                                            );
                                        }, 200);
                                    }}
                                >
                                    {catlvl1.name}
                                </Button>
                            </Typography>
                            {catlvl1.children.map((catlvl2, indx) => (
                                <Typography
                                    variant="span"
                                    align="center"
                                    key={indx}
                                >
                                    <Button
                                        variant="text"
                                        onClick={() => onClick(catlvl2)}
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
                {showBrandPage ? (
                    <Typography variant="h1" align="center">
                        <Button
                            variant="text"
                            onClick={() => {
                                setOpenModal(false);
                                setTimeout(() => {
                                    Router.push(
                                        '/brands',
                                    );
                                }, 200);
                            }}
                        >
                            Brands
                        </Button>
                    </Typography>
                ) : null }

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
