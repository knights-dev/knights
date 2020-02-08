/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import CurvedArrowLine from './CurvedArrowLine';
import DoubleCurvedArrowLine from './DoubleCurvedArrowLine';
// import StreightArrowLine from './StreightArrowLine';

type Props = {
    source: [number, number];
    dest: [number, number];

    withHead?: boolean;
    baseRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;

    horizontal?: boolean;
};

const ArrowLine = (props: Props): JSX.Element => {
    if (!props.horizontal) {
        return <CurvedArrowLine {...props} />;
    } else {
        return <DoubleCurvedArrowLine {...props} />;
    }
};

export default React.memo(ArrowLine);
