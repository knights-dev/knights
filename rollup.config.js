import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        commonjs(),
        resolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        terser(),
    ],
};
