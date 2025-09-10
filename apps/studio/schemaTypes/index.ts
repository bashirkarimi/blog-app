import {sharedArrayTypes} from './arrays'
import {sharedObjectTypes} from './objects'
import {documentTypes} from './documents'

export const schemaTypes = [
  ...documentTypes, ...sharedArrayTypes, ...sharedObjectTypes
]
