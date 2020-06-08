import classNames from 'classnames';
import Typography from '@components/Typography';
import formatDate from '@helpers/date';
import useStyles from './style';

export default ({
    data = [1, 2, 3],
}) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {
                    data.map((index) => (
                        <li
                            key={index}
                            className={
                                classNames(styles.itemContainer, index % 2 === 0 ? styles.right : styles.left)
                            }
                        >
                            <div className="column">
                                <Typography type="bold">
                                    {index % 2 === 0 ? 'Customer (me)' : '(Customer Service)'}
                                    {' '}
                                    {formatDate()}
                                    {' '}
                                    , 13:00:00 AM
                                </Typography>
                                <Typography>
                                    Tes Message
                                </Typography>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
