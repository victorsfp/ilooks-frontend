import React, { Component } from 'react';
import TopPanel from './TopPanel';
import TopHeader from './TopHeader';
import MegaMenu from './MegaMenuTwo';

class Navbar extends Component {
    render() {
        return (
            <>
                <TopPanel />
                
                <TopHeader />

                <MegaMenu />
            </>
        );
    }
}

export default Navbar;
