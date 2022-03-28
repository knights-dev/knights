import React from 'react';

import { CurvedArrowLine } from './CurvedArrowLine';
import { DoubleCurvedArrowLine } from './DoubleCurvedArrowLine';

type Props = {
    source: [number, number];
    dest: [number, number];

    withHead?: boolean;
    baseRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;

    horizontal?: boolean;
};

export const ArrowLine: React.VFC<Props> = ({ horizontal, ...childProps }) =>
    horizontal ? <DoubleCurvedArrowLine {...childProps} /> : <CurvedArrowLine {...childProps} />;
