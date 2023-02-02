/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import React from 'react';
import Link from 'next/link';
import { breakPointsUp } from '@helper_theme';
import Banner from '@common_slick/Banner';
import useStyles from '@core_modules/seller/pages/default/components/style';

function DesktopContent(props) {
    const { data, storeConfig } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    return (
        <div>
            {data && data.map((item) => {
                switch (item.type) {
                case 'carousel':
                    const dataBanner = item.widgets && item.widgets.map((widget) => ({
                        imageUrl: widget.type === 'image' ? widget.url : '',
                        link: widget.type === 'image' ? widget.hyperlink : '',
                        urlEmbed: widget.type === 'video' ? widget.url : '',
                    }));
                    return <Banner data={dataBanner} showArrow={desktop} storeConfig={storeConfig} />;
                case 'single':
                    return (
                        <div className="row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    item.widgets[0].type === 'image'
                                        ? (
                                            <div className="col-12" style={{ margin: 'auto' }}>
                                                <Link href={item.widgets[0].hyperlink ? item.widgets[0].hyperlink : '/#'}><a><img src={item.widgets[0].url} width="100%" alt="img" /></a></Link>
                                            </div>
                                        )
                                        : (
                                            <div className="col-12" style={{ width: '100%' }}>
                                                <iframe width="100%" height="600px" src={item.widgets[0].url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                            </div>
                                        )
                                )
                            }
                        </div>
                    );
                case 'two_columns':
                    return (
                        <div className="row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    item.widgets.map((widget) => (
                                        widget.type === 'image'
                                            ? (
                                                <div className="col-md-12 col-lg-6" style={{ textAlign: 'center', margin: 'auto', width: '100%' }}>
                                                    <Link href={widget.hyperlink ? widget.hyperlink : '/#'}>
                                                        <a><img src={widget.url} width="100%" className={styles.imgColumn} alt="img" /></a>
                                                    </Link>
                                                </div>
                                            )
                                            : (
                                                <div className="col-md-12 col-lg-6">
                                                    <iframe width="100%" height="600px" src={widget.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                                </div>
                                            )
                                    ))
                                )
                            }
                        </div>
                    );
                case 'video':
                    return (
                        <div className="row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    <div className="col-12" style={{ width: '100%' }}>
                                        <iframe width="100%" height="600px" src={item.widgets[0].url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                    </div>
                                )
                            }
                        </div>
                    );
                default:
                    return null;
                }
            })}
        </div>
    );
}

export default DesktopContent;
