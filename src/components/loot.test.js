import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Loot } from './Loot';

configure({ adapter: new Adapter() });

describe('Loot', () => {
    const mockFetchBitcoin = jest.fn();
    const props = { balance: 10, bitcoin: {}, fetchBitcoin: () => {} }
    let loot = shallow(<Loot {...props} />);

    it('renders properly', () => {
        expect(loot).toMatchSnapshot();
    });

    describe('when mounted', () => {
        beforeEach(() => {
            props.fetchBitcoin = mockFetchBitcoin;
            loot = mount(<Loot {...props} />);
        });

        it('dispatches the `fetchBitcoin()` it receives from props', () => {
            expect(mockFetchBitcoin).toHaveBeenCalled();
        });
    });

    describe('when there are valid bitcoin props', () => {
        beforeEach(() => {
            props = { 
                balance: 10,
                bitcoin: { 
                    bpi: { 
                        USD: { rate: '1,000'} 
                    } 
                } 
            }
            loot = shallow(<Loot { ...props } />);
        });

        it('displays the correct bitcoin value', () => {
            expect(loot.find('h3').text()).toEqual('Bitcoin Balance: 0.01');
        });
    })
});