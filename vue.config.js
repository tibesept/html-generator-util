const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	// configureWebpack: (config) => {
	// 	// dev режим
	// 	if (config.mode === 'development') {
	// 	 // добавляем проксирование запросов к апи
	// 	 config.devServer = {
	// 	   proxy: 'http://localhost:5015'
	// 	 }
	// 	}
	//    },
	transpileDependencies: true
})
