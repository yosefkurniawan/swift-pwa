import _app from '@core_modules/theme/pages/_app';

/**
 * import global css only can on _app.js on root app. cannot on modules
 *  */
import '../core/styles/index.css';
import '../core/styles/mediaquery.css';
import '../core/styles/flexboxgrid.min.css';

export default _app;
