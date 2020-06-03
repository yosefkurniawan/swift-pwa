/* eslint-disable no-unused-vars */
import Button from '@components/Button';
import Typography from '@components/Typography';

const RewardPoint = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    storeConfig,
    styles,
}) => {
    const handleUsePoint = () => {
        console.log(1);
    };
    return (
        <div className={styles.cardPoint}>
            <div className="column">
                <Typography variant="span" letter="capitalize">
                    My Point
                </Typography>
                <Typography variant="title" type="bold" className={styles.pointText}>
                    {checkout.data.point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </Typography>
            </div>
            <div>
                <Button variant="outlined" className={styles.btnPoint} onClick={handleUsePoint}>
                    <Typography variant="p" type="bold" letter="uppercase">
                        USE MY POIN
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default RewardPoint;
