import Vue from 'vue'
import bsContainer from './mContainer';
import bsCenter from './mCenter';
import bsHeader from './mHeader';
import bsFooter from './mFooter';
import mList from './mList/mList';
import mListCell from './mList/mListCell';
import { mGrid, mGridItem } from 'components/mGrid';
import mSpinner from './mSpinner';
import scrollers from 'components/scrollers'
Vue.component('m-container', bsContainer);
Vue.component('m-center', bsCenter);
Vue.component('m-header', bsHeader);
Vue.component('m-footer', bsFooter);
Vue.component('m-list', mList);
Vue.component('m-list-cell', mListCell);
Vue.component('m-grid', mGrid);
Vue.component('m-grid-item', mGridItem);
Vue.component('m-spinner', mSpinner);
Vue.component('m-scroller', scrollers);
