# erp_front


### State manager
[pinia](https://pinia.vuejs.org/introduction.html)

### Шаблон
[git connect-plus-vue](https://github.com/BootstrapDash/connect-plus-vue-free-admin-template/tree/main)

### Vue
[Vue 3](https://vuejs.org/guide/introduction.html)

### Kit
В проект используется Kit, создан из шаблона connect-plus
[Как использовать kit](https://tupa-germania.atlassian.net/wiki/spaces/DIG/pages/2883591) 

### Работа с роутами
Для работы с роутами используется библиотека *vue-router*.
Пути для роутов, имена роутов и права описаны в router в @/router.
Для того, чтобы создать ссылку на роут, нужно использовать компонент *router-link*.
Пример для обычного роута - 
```html
<router-link to="/">Главная</router-link>
```
Пример для роута с параметром
```html
<router-link :to="{ name: 'dashboard', params: { status: 'some' } }">Главная</router-link>
```
В данном Kit (Шаблоне) нужно использовать атрибут *active-class="active"* у компонента *router-link*,
чтобы компонент заменил свой дефолтный класс на класс кита *active*.
Т.е. линк будет выглядеть так
```html
<router-link to="/" active-class="active">Главная</router-link>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

