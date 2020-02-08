/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import CurvedArrowLine from './CurvedArrowLine';
import DoubleCurvedArrowLine from './DoubleCurvedArrowLine';

type Props = {
    source: [number, number];
    dest: [number, number];

    withHead?: boolean;
    baseRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;

    horizontal?: boolean;
};

const ArrowLine = ({ horizontal, ...childProps }: Props): JSX.Element =>
    horizontal ? <DoubleCurvedArrowLine {...childProps} /> : <CurvedArrowLine {...childProps} />;

export default React.memo(ArrowLine);
