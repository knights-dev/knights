import React from 'react';

import { EventLayout } from '../struct';

type Props = {
    x: number;
    y: number;

    onLayout: EventLayout;
};

/**
    関数適用を表すノード

    黒丸で、第一入力(関数側)は矢印なしで左右に、第二入力(引数側)は矢印有りで上下に接続する。
*/
export const ApplyNode: React.VFC<Props> = ({ x, y, onLayout }) => {
    onLayout({
        inputPoint: [
            [x, y],
            [x, y],
        ],
        outputPoint: [x, y],
    });

    return <circle fill="black" cx={x} cy={y} r={3} />;
};
