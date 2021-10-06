import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';
import MuiTabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import { useState } from 'react';

const TabPanel = (props) => {
    const {
        elements, value, index, storeConfig,
    } = props;
    return (
        <>
            <div role="tabpanel" hidden={value !== index}>
                {elements.map((element, k) => (
                    <MagezonElement key={k} {...element} storeConfig={storeConfig} />
                ))}
            </div>
        </>
    );
};

const Tabs = withStyles({
    indicator: {
        backgroundColor: 'transparent',
    },
})(MuiTabs);

const Tab = withStyles({
    root: {
        backgroundColor: '#ebebeb',
        marginRight: 5,
        border: '1px solid #e3e3e3',
        borderBottom: 'none',
        borderRadius: '5px 5px 0 0',
    },
    selected: {
        backgroundColor: '#f8f8f8',
    },
})(MuiTab);

const MagezonTabs = (props) => {
    // prettier-ignore
    const {
        active_tab, elements, no_fill_content_area, tab_align, tab_position,
        storeConfig,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    console.log(props);
    const TabProps = {
        active_tab,
        no_fill_content_area,
        tab_align,
        tab_position,
        storeConfig,
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <div className="mgz-tabs">
                <Tabs value={activeTab} onChange={handleChange}>
                    {elements.map((element, index) => (
                        <Tab key={index} label={element.title} disableRipple disableFocusRipple />
                    ))}
                </Tabs>
                <div className="tab-body">
                    {elements.map((element, index) => (
                        <TabPanel key={index} elements={element.elements} value={activeTab} index={index} {...TabProps} />
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .tab-body {
                        background-color: #f8f8f8;
                        border: 1px solid #e3e3e3;
                        border-top: none;
                        border-radius: 0 0 5px 5px;
                        padding: 20px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonTabs;
