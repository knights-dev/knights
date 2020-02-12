/* @jsx jsx */
import '../scss/editor.scss';

import { jsx } from '@emotion/core';
import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { PatternNode } from '../components/nodes';

export default {
    title: 'PatternNode',
    decorators: [withKnobs],
    component: PatternNode,
};

export const Input = (): JSX.Element => {
    return (
        <React.Fragment>
            <svg className="editor-screen">
                <PatternNode x={number('x', 50)} y={number('y', 50)} />
            </svg>
        </React.Fragment>
    );
};
