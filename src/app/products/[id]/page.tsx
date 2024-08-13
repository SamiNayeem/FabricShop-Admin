'use client'
import React from 'react';
import Menu from '@/components/menu-bar/menu-bar';
import Body from './body';


const Page = () => {
    return (
        <div className="flex w-full">
            <Menu />
            <Body />
        </div>
    );
};

export default Page;
