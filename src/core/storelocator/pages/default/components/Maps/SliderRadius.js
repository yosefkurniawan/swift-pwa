import Slider from '@material-ui/core/Slider';

const SliderRadius = ({ radius, setRadius }) => (
    <>
        <div style={{ lineHeight: '9px', paddingTop: '8px' }}>
            1 Km
            <span style={{ float: 'right' }}>100 Km</span>
        </div>
        <Slider
            value={radius}
            onChange={(e, newValue) => setRadius(newValue)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            scale={(x) => Math.round(x / 1000)}
            step={1000}
            min={1000}
            max={100 * 1000}
        />
    </>
);

export default SliderRadius;
