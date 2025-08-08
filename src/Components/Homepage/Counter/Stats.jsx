import React from 'react';
import Counter from './Counter';


const Stats = () => {
    return (
        <div>
            <h1 className='text-[40px] font-medium text-center mt-20'>Impact at a Glance</h1>
            <Counter></Counter>
        </div>
    );
};

export default Stats;