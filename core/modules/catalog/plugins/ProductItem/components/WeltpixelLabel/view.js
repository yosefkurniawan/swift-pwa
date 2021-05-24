import React from 'react';
import classNames from 'classnames';
import useStyles from './style';

const WeltpixelLabelView = (props) => {
    const { data = [] } = props;
    const styles = useStyles();
    return (
        <>
            {
                data && data.length > 0 && data.map((item, key) => (
                    <div key={key} className={classNames('text-container', styles[item.position])}>
                        {
                            item.image
                                ? (<img src={item.image} alt={item.text} />)
                                : (<p className="text-label">{item.text}</p>)
                        }
                        <style jsx>
                            {`
                                .text-container {
                                    ${item.css}
                                    background: ${item.image ? 'transparent' : item.text_bg_color};
                                    overflow: auto;
                                    display: table;              
                                    padding: ${item.text_padding};
                                }

                                .text-label {
                                    display: table-row;                      
                                    font-size: ${item.text_font_size};
                                    color: ${item.text_font_color};
                                }
                              

                            `}
                        </style>
                    </div>
                ))
            }
        </>
    );
};

export default WeltpixelLabelView;
