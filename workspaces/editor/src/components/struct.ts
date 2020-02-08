type SymbolBranded<T, S extends symbol, U extends S> = T & { [key in U]: never };

const px = Symbol('px');
const mm = Symbol('mm');
export type Px = typeof px;
export type Mm = typeof mm;
type LengthUnit = Px | Mm;
export type Length<U extends LengthUnit> = SymbolBranded<number, LengthUnit, U>;

export type NodeID = string;
export type NodePosition = [number, number];

export interface GraphNode {
    id: NodeID;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any;
    position: NodePosition;
    inputs: string[];
}

export type Graph = {
    nodes: GraphNode[];
    inputs: NodeID[];
};

export type NodeLayoutInfo = {
    inputPoint: NodePosition[];
    outputPoint: NodePosition;
};

export type EventLayout = (e: NodeLayoutInfo) => void;

export const sampleGraph: Graph = {
    nodes: [
        { id: '1', type: 'Input', params: { bind: 'x' }, position: [100, 100], inputs: [] },
        { id: '2', type: 'Input', params: { bind: 'y' }, position: [100, 300], inputs: [] },
        { id: '3', type: 'Value', params: { name: '+' }, position: [100, 200], inputs: [] },
        { id: '4', type: 'Apply', params: {}, position: [300, 200], inputs: ['3', '1'] },
        { id: '5', type: 'Apply', params: {}, position: [500, 150], inputs: ['4', '2'] },
        { id: '6', type: 'Output', params: {}, position: [600, 200], inputs: ['5'] },
    ],
    inputs: ['x', 'y'],
};
