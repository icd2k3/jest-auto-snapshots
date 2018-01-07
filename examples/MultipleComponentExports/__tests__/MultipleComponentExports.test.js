import snap from 'jest-auto-snapshots';
import { ComponentOne, ComponentTwo } from '../MultipleComponentExports';

snap(ComponentOne, { path: '../MultipleComponentExports.jsx' });
snap(ComponentTwo, { path: '../MultipleComponentExports.jsx' });
