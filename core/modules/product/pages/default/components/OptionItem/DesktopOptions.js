import ConfigurableOption from '../../../../plugin/OptionItem/ConfigurableOption';
import SimpleOption from '../../../../plugin/OptionItem/SimpeProduct';
import VirtualOption from '../../../../plugin/OptionItem/Virtual';
import DownloadOption from '../../../../plugin/OptionItem/Download';
import BundleOption from '../../../../plugin/OptionItem/BundleOption';

const Options = (props) => {
    const { data } = props;
    const { __typename } = data;
    return (
        <>
            {__typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {__typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {__typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {__typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {__typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}
        </>
    );
};

export default Options;
