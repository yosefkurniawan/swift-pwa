import useStyles from './style'
import Typograpy from '../../Typography'
import classNames from 'classnames'


const Component = ({ active = false, value = "", onChange }) => {
    const styles = useStyles()
    const [checked, setChecked] = React.useState(active);
    const handleChange = () => {
      setChecked(!checked);
    };
    const containerStyle = checked ? classNames(styles.container, styles.active) : styles.container
    const customStyle = {
        backgroundColor : `${value || '#fff'}`
    }
    return (
        <div className={containerStyle} onClick={handleChange} style={customStyle}>
        </div>
    )
}

export default Component