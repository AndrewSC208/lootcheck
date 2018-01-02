import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Wallet } from './Wallet';

configure({ adapter: new Adapter() });

describe('Wallet', () => {
    const mockDeposit = jest.fn();
    const mockWithdraw = jest.fn();
    const props = { 
        balance: 20, 
        deposit: mockDeposit,
        withdraw: mockWithdraw 
    };

    const wallet = shallow(<Wallet {...props} />);

    it('renders properly', () => {
        expect(wallet).toMatchSnapshot();
    });

    it('displays the balance from props', () => {
        expect(wallet.find('.balance').text()).toEqual('Wallet balance: 20');
    });

    it('creates an input to deposit into or withdraw from the balance', () => {
        expect(wallet.find('.input-wallet').exists()).toBe(true);
    });

    describe('when the user types into the wallet input', () => {
        const userBalance = '25';

        beforeEach(() => {
            wallet.find('.input-wallet')
                .simulate('change', { target: { value: userBalance }});
        });

        it('updated the local wallet balance in `state` and converts it to an int', () => {
            expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
        });

        describe('and the user wants to make a deposit', () => {
            beforeEach(() => wallet.find('.btn-deposit').simulate('click'));
    
            it('dispatches the `deposit()` it recevies from props with local balance', () => {
                expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
            });
        });

        describe('and the user wants to make a withdraw', () => {
            beforeEach(() => wallet.find('.btn-withdraw').simulate('click'));

            it('dispatches the `withdraw()` it recevies from props with local balance', () => {
                expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
            });
        });
    });
});