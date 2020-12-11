import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@common_typography';
import classNames from 'classnames';
import { lineStyle, useIconStyles } from './style';

const CustomConnector = withStyles(lineStyle)(StepConnector);

const IconStep = ({ status, activeStatus }) => {
    const styles = useIconStyles();

    return (
        <div className={classNames(styles.iconContainer, styles[`iconContainer${activeStatus}`])}>
            <span className={styles[`icon${status + activeStatus}`]} />
        </div>
    );
};

const OrderStatusIcon = ({ status, t }) => {
    const styles = useIconStyles();
    let steps = ['pending', 'processing', 'shipping', 'complete'];

    if (status === 'canceled') {
        steps = ['pending', 'canceled'];
    }

    const generateIconStyle = (active, statusIcon) => {
        if (active) {
            return 'active';
        }

        if (steps.indexOf(statusIcon) < steps.indexOf(status)) {
            return 'skip';
        }
        return 'inactive';
    };

    const generateLabel = (label) => t(`order:labelStatus:${label}`);

    let active = steps.indexOf(status);
    if (status === 'ready_to_ship') {
        active = 1;
    }

    return (
        <div
            className={styles.container}
        >
            <Stepper
                alternativeLabel
                activeStep={active}
                connector={<CustomConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={(props) => (
                                <IconStep
                                    {...props}
                                    status={label}
                                    activeStatus={generateIconStyle(props.active, label)}
                                />
                            )}
                            classes={{
                                label: styles.stepLabel,
                            }}
                        >
                            <Typography variant="span" letter="capitalize" className={classNames('clear-margin-padding', styles.label)}>
                                {generateLabel(label)}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default OrderStatusIcon;
