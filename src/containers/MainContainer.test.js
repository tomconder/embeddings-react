import {shallow} from 'enzyme';
import MainContainer from './MainContainer';

describe('<MainContainer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MainContainer />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
