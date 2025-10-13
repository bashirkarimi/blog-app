import { heroTypes } from './heros';
import { sectionTypes } from './sections';
import {linkType} from '../modules/link';

export const sharedObjectTypes = [
  ...heroTypes,
  ...sectionTypes,
  linkType
];