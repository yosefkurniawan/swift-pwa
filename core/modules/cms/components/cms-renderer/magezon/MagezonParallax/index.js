import { jarallax } from 'jarallax';

/* eslint-disable */
export default class MagezonParallax extends React.Component {
    constructor(props) {
        super(props);

        this.$el = React.createRef();
    }

    // init on mount.
    componentDidMount() {
        jarallax(this.$el.current, this.props.options);
    }

    // reinit when props changed.
    componentDidUpdate(prevProps) {
        if (!this.isDestroyed && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            jarallax(this.$el.current, 'destroy');
            jarallax(this.$el.current, this.props.options);
        }
    }

    // destroy on unmount.
    componentWillUnmount() {
        this.isDestroyed = true;
        jarallax(this.$el.current, 'destroy');
    }

    render() {
        const { src, speed, type } = this.props;

        return (
            <div
                className="jarallax"
                ref={this.$el}
                data-speed={speed}
                data-type={type}
                style={{ backgroundImage: `url(${src})` }}
            ></div>
        );
    }
}
