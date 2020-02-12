/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { ApplyNode, IONode, ValueNode } from './nodes';
import { EventLayout, GraphNode, NodeLayoutInfo, NodePosition } from './struct';

const createComponent = (node: GraphNode, onLayout: EventLayout): JSX.Element => {
    const [x, y] = node.position;
    switch (node.type) {
        case 'Input':
            return <IONode x={x} y={y} onLayout={onLayout} text={node.params.bind || ''} key={node.id} />;
        case 'Value':
            return <ValueNode x={x} y={y} onLayout={onLayout} text={node.params.name || ''} key={node.id} />;
        case 'Apply':
            return <ApplyNode x={x} y={y} onLayout={onLayout} key={node.id} />;
        case 'Output':
            return <IONode x={x} y={y} onLayout={onLayout} text="Output" key={node.id} />;
        default:
            throw new Error('Unknown type');
    }
};

type Props = {
    nodes: GraphNode[];
    setInputPos: React.Dispatch<React.SetStateAction<Map<string, NodePosition[]>>>;
    setOutputPos: React.Dispatch<React.SetStateAction<Map<string, NodePosition>>>;
};

const NodesLayer = ({ nodes, setInputPos, setOutputPos }: Props): JSX.Element => {
    const nodeElements: JSX.Element[] = [];

    for (const node of nodes) {
        const nodeId = node.id;
        const onLayout = (e: NodeLayoutInfo): void => {
            setInputPos(inputPos => {
                inputPos.set(nodeId, e.inputPoint);
                return inputPos;
            });
            setOutputPos(outputPos => {
                outputPos.set(nodeId, e.outputPoint);
                return outputPos;
            });
        };
        const el = createComponent(node, onLayout);
        nodeElements.push(el);
    }
    return <React.Fragment>{nodeElements}</React.Fragment>;
};

export default React.memo(NodesLayer);
