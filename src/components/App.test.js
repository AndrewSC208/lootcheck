import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
    const app = shallow(<App />);

    it('renders properly', () => {
        expect(app).toMatchSnapshot();
    });
   
    it('contains a connected wallet component', () => {
        // good way to print out jsx to see what is being rendered
        //console.log(app.debug());
        expect(app.find('Connect(Wallet)').exists()).toBe(true);
    })
});