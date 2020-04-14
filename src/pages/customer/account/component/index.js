// Library
import React, { Fragment } from "react";
import Link from "next/link";

// Styling And Component
import Carousel from "@components/Slider/Carousel";
import useStyles from "./style.js";

const Content = ({t}) => {
  const styles = useStyles();
  const data = [
    {
      img:
        "https://www.creohouse.co.id/wp-content/uploads/2016/09/jasa-desain-banner-web-creohouse.jpg",
      link: "/",
    },
    {
      img: "assets/img/noun_Image.svg",
      link: "/",
    },
    {
      img: "assets/img/noun_Image.svg",
      link: "/",
    },
  ];

  return (
    <Fragment>
      <div className={styles.account_wrapper}>
        <div
          className={[
            styles.account_block,
            styles.padding_vertical_40,
            styles.border_bottom,
          ].join(" ")}
        >
          <h3 className={styles.account_username}>Diasty Hardhikaputri</h3>
          <p className={styles.account_email}>hardhikaputri@gmail.com</p>
        </div>
        <div
          className={[styles.account_block, styles.padding_vertical_40].join(
            " "
          )}
        >
          <div className={styles.account_point}>
            <p className={styles.account_point_title}>My Point</p>
            <h3 className={styles.account_point_summary}>100.000</h3>
          </div>
          <div className={styles.account_block}>
            <ul className={styles.account_navigation}>
              <li className={styles.account_navigation_item}>
                <Link href="#">
                  <a className={styles.account_navigation_link}>My Order</a>
                </Link>
              </li>
              <li className={styles.account_navigation_item}>
                <Link href="/customer/account/profile">
                  <a className={styles.account_navigation_link}>My Account</a>
                </Link>
              </li>
              <li className={styles.account_navigation_item}>
                <Link href="/customer/account/address">
                  <a className={styles.account_navigation_link}>Address Book</a>
                </Link>
              </li>
              <li className={styles.account_navigation_item}>
                <Link href="/customer/setting">
                  <a className={styles.account_navigation_link}>Settings</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={[styles.account_block, styles.wishlistBlock].join(" ")}>
          <div className={styles.account_clearfix}>
            <h4 className={styles.account_wishlist_title}>Wishlist</h4>
            <h5 className={styles.account_wishlist_read_more}>Read More</h5>
          </div>
          <div className={styles.account_clearfix}>
            <Carousel
              data={data}
              className={[styles.wishlistBlock, styles.margin20].join(" ")}
            />
          </div>
        </div>
        <div className={styles.account_block}>
          <ul className={styles.account_navigation}>
            <li className={styles.account_navigation_item}>
              <a
                className={styles.account_navigation_link}
                href="/customer/account/login"
              >
                {t("customer:button:logout")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
