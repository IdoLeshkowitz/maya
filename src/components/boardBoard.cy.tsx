import React from 'react'
import Board from './board'
import Group from "@components/group";
import Option from "@components/option";

describe('<Board />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.viewport(1000, 600)
        cy.mount(
            <Board taskMeta={{
                leftOption : {
                    optionName : 'left',
                    optionColor: 'red',
                    groupsNames: ['ZKL', 'ZBV', 'ZBV']
                },
                rightOption: {
                    optionName : 'right',
                    optionColor: 'blue',
                    groupsNames: ['ZKL', 'ZBV', 'ZBV']
                },
                variantName: 'variantName',
                performance: {} as any,
            }}>
                {/*<Option optionName="busoijs" optionColor="red">*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*</Option>*/}
                {/*<Option optionName="busoijs" optionColor="red">*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*    <Group groupName="lkjlhkjhkj"/>*/}
                {/*</Option>*/}
            </Board>
        )
    })
})