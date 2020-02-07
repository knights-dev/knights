/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { ArrowLine } from './nodes';
import { GraphNode, NodeID, NodePosition } from './struct';

type Props = {
    nodes: GraphNode[];
    inputPos: Map<NodeID, NodePosition[]>;
    outputPos: Map<NodeID, NodePosition>;
};

const PatternNode = ({ nodes, inputPos, outputPos }: Props): JSX.Element => {
    const arrowElements: JSX.Element[] = [];
    for (const node of nodes) {
        const toId = node.id;
        const destPosList = inputPos.get(toId);
        if (destPosList == null) continue;
        for (const argId in node.inputs) {
            const fromId = node.inputs[argId];
            const sourcePos = outputPos.get(fromId);
            const destPos = destPosList[argId];
            if (sourcePos != null && destPos != null) {
                const el = <ArrowLine source={sourcePos} dest={destPos} />;
                arrowElements.push(el);
            }
        }
    }
    return (
        <React.Fragment>
            <g className="layer-arrows">{arrowElements}</g>
        </React.Fragment>
    );
};

export default React.memo(PatternNode);
