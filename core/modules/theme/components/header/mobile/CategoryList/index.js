/* eslint-disable operator-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';

import useStyles from './style';

const CategoryList = (props) => {
    const { data } = props;

    const styles = useStyles();
    const router = useRouter();

    const [categoryKeyState, setCategoryKeyState] = useState(null);
    const [categoryDataState, setcategoryDataState] = useState(null);

    useEffect(() => {
        let categoryKey;
        let categoryData;

        if (data && data.categoryList[0] && categoryKeyState === null && categoryDataState === null) {
            const filterLogic = (el) => {
                if (el.include_in_menu === 0 && el.url_key !== 'collections') {
                    return false;
                }
                if (el.include_in_menu === 1 && el.children.length === 0 && el.url_key !== 'sale') {
                    return false;
                }
                return el;
            };

            categoryData = data.categoryList[0].children.filter(filterLogic);
            setcategoryDataState(categoryData);

            if (categoryData) {
                categoryData.map((lvl0) => {
                    if (lvl0.include_in_menu === 0) {
                        if (lvl0.url_key === 'collections') {
                            categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.url_key}`]: false };
                        }
                    } else if (lvl0.include_in_menu === 1 && !lvl0.url_path.includes('test')) {
                        if (lvl0.children.length > 0) {
                            categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.url_key}`]: false };
                            // eslint-disable-next-line array-callback-return
                            lvl0.children.map((lvl1) => {
                                categoryKey = { ...categoryKey, [`${lvl1.id}-${lvl1.url_key}`]: false };

                                if (lvl1.children.length > 0) {
                                    // eslint-disable-next-line array-callback-return
                                    lvl1.children.map((lvl2) => {
                                        if (!lvl2.url_key.includes('test')) {
                                            categoryKey = { ...categoryKey, [`${lvl2.id}-${lvl2.url_key}`]: false };
                                        }
                                    });
                                }
                            });
                        } else if (lvl0.url_key === 'sale') {
                            categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.url_key}`]: false };
                        }
                    }
                });
            }

            setCategoryKeyState(categoryKey);
        }
    }, [data, categoryDataState, categoryKeyState]);

    const handleClick0 = (key) => {
        setCategoryKeyState({ ...categoryKeyState, [key]: !categoryKeyState[key] });
    };

    return (
        <>
            {categoryDataState &&
                categoryKeyState &&
                categoryDataState.map((lvl0) => (
                    <>
                        <ListItem button onClick={() => handleClick0(`${lvl0.id}-${lvl0.url_key}`)} className={styles.zeroLevel}>
                            <ListItemText primary={lvl0.name} />
                            {lvl0.children.length > 0 && (categoryKeyState[`${lvl0.id}-${lvl0.url_key}`] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        <Collapse in={categoryKeyState[`${lvl0.id}-${lvl0.url_key}`]} timeout="auto">
                            <List component="div" disablePadding>
                                <ListItem button onClick={() => router.push(`${lvl0.url_path}`)} className={styles.firstLevel}>
                                    <ListItemText primary={`All ${lvl0.name}`} />
                                </ListItem>
                                {lvl0.children.length > 0 &&
                                    lvl0.children.map((lvl1) => (
                                        <>
                                            {lvl1.children.length > 0 ? (
                                                <>
                                                    <ListItem
                                                        button
                                                        onClick={() => handleClick0(`${lvl1.id}-${lvl1.url_key}`)}
                                                        className={styles.firstLevel}
                                                    >
                                                        <ListItemText primary={lvl1.name} />
                                                        {categoryKeyState[`${lvl1.id}-${lvl1.url_key}`] ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={categoryKeyState[`${lvl1.id}-${lvl1.url_key}`]} timeout="auto">
                                                        <List component="div" disablePadding>
                                                            <ListItem
                                                                button
                                                                onClick={() => router.push(`${lvl1.url_path}`)}
                                                                className={styles.secondLevel}
                                                            >
                                                                <ListItemText primary={`All ${lvl1.name}`} />
                                                            </ListItem>
                                                            {lvl1.children.length > 0 &&
                                                                lvl1.children.map((lvl2) => (
                                                                    <>
                                                                        <ListItem
                                                                            button
                                                                            onClick={() => router.push(`${lvl2.url_path}`)}
                                                                            className={styles.secondLevel}
                                                                        >
                                                                            <ListItemText primary={lvl2.name} />
                                                                        </ListItem>
                                                                    </>
                                                                ))}
                                                        </List>
                                                    </Collapse>
                                                </>
                                            ) : (
                                                <ListItem button onClick={() => router.push(`${lvl1.url_path}`)} className={styles.firstLevel}>
                                                    <ListItemText primary={lvl1.name} />
                                                </ListItem>
                                            )}
                                        </>
                                    ))}
                            </List>
                        </Collapse>
                    </>
                ))}
        </>
    );
};

export default CategoryList;
