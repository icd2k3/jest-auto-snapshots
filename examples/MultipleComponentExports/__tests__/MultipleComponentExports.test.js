import snap from 'jest-auto-snapshots';
import { ComponentOne, ComponentTwo } from '../MultipleComponentExports';

snap(ComponentOne, '../MultipleComponentExports.jsx');
snap(ComponentTwo, '../MultipleComponentExports.jsx');
