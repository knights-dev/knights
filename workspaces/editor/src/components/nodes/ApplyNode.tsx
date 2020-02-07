/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { EventLayout } from '../struct';

type Props = {
    x: number;
    y: number;

    onLayout: EventLayout;
};

const ApplyNode = ({ x, y, onLayout }: Props): JSX.Element => {
    onLayout({
        inputPoint: [
            [x, y],
            [x, y],
        ],
        outputPoint: [x, y],
    });

    return <React.Fragment />;
};

export default React.memo(ApplyNode);
