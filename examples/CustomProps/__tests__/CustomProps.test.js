import snap from 'jest-auto-snapshots';
import CustomProps from '../CustomProps';

snap(CustomProps, { props: { customProp: 'customproptest' } });
