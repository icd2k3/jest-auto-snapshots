import snap from 'jest-auto-snapshots';
import CustomProps from '../CustomProps';

snap(CustomProps, '../CustomProps.jsx', { fixturesByPropType: { customProp: 'customproptest' } });
