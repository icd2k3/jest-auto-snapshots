import snap from 'jest-auto-snapshots';
import TestNextToComponent from './TestNextToComponent';

/**
 * jest-auto-snapshots needs to parse the actual component file
 * in order to see which props it needs. By default, it expects
 * your test file to be in a direftory next to your component. But
 * if you prefer your tests to sit right nect to your component
 * (or any other location) you can override the default with `relativePath`
 * Note that this can also be set in your jest setup file at the root level
 */

snap(TestNextToComponent, { relativePath: './' });
