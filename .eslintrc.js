module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	extends: [
		// 'eslint:recommended',
		// 'plugin:vue/vue3-recommended',
		// 'plugin:@typescript-eslint/recommended'
	],
	overrides: [
		{
			files: ['*.ts', '*.js'],
			rules: {
				'indent': ['error', 'tab'],
				'@typescript-eslint/indent': ['error', 'tab'],
				'no-tabs': 'off',
			}
		},
		{
			files: ['*.vue'],
			rules: {
				'@typescript-eslint/indent': ['error', 4],
				'indent': ['error', 4, { "SwitchCase": 1 }],
			}
		}
	],
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		'import/ignore': [
			'\\.svg$',
			'\\.jpg$',
			'\\.png$',
			'\\.webp$',
		]
	},
};