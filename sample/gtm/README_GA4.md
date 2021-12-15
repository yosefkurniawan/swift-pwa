## GTM/GA4 in SwiftPWA GA4
We implement GA4 / GTM in SwiftPWA based on the GA4 / GTM approach that currently works in Swift Magento. In Magento Swift we use the Weltpixel extension. With this extension, GA4 is implemented through GTM.  In weltpixel, we can generate json that contain the Variables, Triggers, and Tags that we need and to be imported into the GTM account.
In order to do the same, here are steps need to do to implement it in Swift PWA:
1. We have provided sample exported json from weltpixel google analytics 4 in sample/gtm/gtmExport_WP_PWA_GA4.json. We can use this as the starting point.
2. Important! Because we use different GTM and GA4 for SwiftPWA, we need to update some values in the exported json. 
    * Find **<<@account_id>>** and replace with the GTM account ID, e.g. 6005462810
    * Find **<<@container_id>>** and replace with the GTM Container ID, e.g. 55705650
    * Find **<<@gtm_id>>** and replace with the GTM ID, e.g. GTM-KKZL5SK
    * Find **<<@measurement_id>>** and replace with the Google Analytics 4 Measurement ID, e.g. G-3WXP21PX5M
3. Enable GTM feature and set GTM ID in swift.config.js
4. Go to GTM dashboard and import the json at admin > Container > Import Container
5. Enable Ecommerce in GA4 dashboard setting