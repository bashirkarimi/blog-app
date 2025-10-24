import {sharedArrayTypes} from './arrays'
import {sharedObjectTypes} from './objects'
import {documentTypes} from './documents'
import siteSettings from './singletons/site-settings'
import homePage from './singletons/home-page'
import detailsPage from './singletons/details-page'

export const schemaTypes = [
  ...documentTypes,
  ...sharedArrayTypes,
  ...sharedObjectTypes,
  siteSettings,
  homePage,
  detailsPage,
]
