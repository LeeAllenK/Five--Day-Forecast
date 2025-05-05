import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from '@rollup/plugin-terser';

export default {
	input: {
		main: 'src/index.js', 
		signIn: 'src/components/signIn.js' 
	},
	output: {
		dir: 'dist',
		format: 'esm',
		entryFileNames: '[name].js',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({ babelHelpers: 'bundled' }),
		terser()
	],
	build: {
		chunkSizeWarningLimit: 1000
	}
};
