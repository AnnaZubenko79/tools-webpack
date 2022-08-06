# КОНСПЕКТ

## Table of Contents

1. [WEBPACK](#WEBPACK)
   [WEBPACK-Loaders](#WEBPACK-Loaders)
1. [](#references)

## WEBPACK

WEBPACK - необходим для того чтобы большое количество файлов наших или из сторонних библиотек собрать в кучу и чтобы это все работало

![Webpack+ES Modules](/img/webpack_esmodules.png)

Принцип работы Webpack - берет сторонние файлы и переделывает их
![Principes Webpack](/img/principes_wp.png)

![Oppotunity Webpack](/img/oppotunity.png)

## Установка

npm i -D webpack

если нужна версия, то npm i -D webpack@4

Чтобы при работе с Webpack не появлялось предупреждение о том что он по умолчанию работает в режиме продакшн, необходимо указать --mode=production. В таком режиме возвращается минифицированный файл

```javascript
 "scripts": {
    "build": "webpack --mode=production"
  },
```

Код ниже вернет расширенный файл

```javascript
 "scripts": {
    "build": "webpack --mode=development"
  },
```

Можно писать сокращенные команды (в powershell не работает)

- -d --mode=development
- -p --mode=production
  ![Zero config](/img/zero-config.png)
  WP необходимо указать точку входа в приложение. Если не указывать входящий файл, то по умолчанию WP будет искать в папке src index.js, если не найдет, то выдаст ошибку.
  Если же мы хотим назвать по другому наш файл, то обязательно нужно указать в package.json точку входа

```javascript
 "scripts": {
    "build": "webpack ./src/my-index.js --mode=development"
  },
```

С файлом, котрый по умолчанию возвращает вебпак работать невозможно, так как он генерирует свои переменные и т.д. Чтобы мы могли увидеть свой код в инструментах разработчика нужно добавить --devtool eval-source-maps. И по итогу мы генерируем

- для разработки - "watch": "webpack ./src/my-index.js --mode=development --devtool eval-source-maps -w" (флаг -w, отслеживает и собирает наш код в реальном времени),
- для продакшн - "build": "webpack ./src/my-index.js --mode=production"

```javascript
"scripts": {
   "build": "webpack ./src/my-index.js --mode=production",
   "watch": "webpack ./src/my-index.js --mode=development --devtool eval-source-maps -w"
 },
```

Удобнее выносить настройки webpack в файл конфигурации webpack.config.js. Если у файла такое имя и он находится в корне, то команда webpack его сразу же подхватит, но на самом деле файл может находится где угодно и под другим именем в таком случае нужно указать путь к этому файлу с командой --config=./filepath

Самый простой файл по умолчанию выглядит вот так

Мы в нем пользуемся команд js модулями. Все что нам нужно использовать из файла объект (самый простой случай, может быть и функция), в котором мы определенным образом конфигурируем сборку. В самом минимальном случае в объекте может быть только точка входа

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js', //точка входа
  output: {
    filename: 'bundle.js', //название собранного файла со скриптами
    path: path.join(__dirname, 'built'), //папка для собранных файлов
  },
  watch: false, // вкл/выкл отслеживание изменений
};
```

Если точек входа несколько, в таком случае нужно настроить output

```javascript
  {
	entry: {
	profile: './src/profile/index.js', // несколько точек входа
	dashboard: './src/dashboard/index.js'
},
 output: {
    filename: '[name].js',
  },
  }
```

## WEBPACK-Loaders

Для чего нужны лоадеры? Лоадеры существуют для того чтобы объяснить вебпаку, что делать с тем или иным файлом, так как по умолчанию вебпак работает с файлами js, а лоадеры объясняют вебпаку, что делать с файлами другого типа

<!-- <a name="types--primitives"></a><a name="1.1"></a>
  - [1.1](#types--primitives) **Primitives**: When you access a primitive type you work directly on its value.

    - `string`
    - `number`
    - `boolean`
    - `null`
    - `undefined`
    - `symbol`
    - `bigint`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```

    - Symbols and BigInts cannot be faithfully polyfilled, so they should not be used when targeting browsers/environments that don’t support them natively.

  <a name="types--complex"></a><a name="1.2"></a>
  - [1.2](#types--complex)  **Complex**: When you access a complex type you work on a reference to its value.

    - `object`
    - `array`
    - `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**

## References

  <a name="references--prefer-const"></a><a name="2.1"></a>
  - [2.1](#references--prefer-const) Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](https://eslint.org/docs/rules/prefer-const), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign)

    > Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  <a name="references--disallow-var"></a><a name="2.2"></a>
  - [2.2](#references--disallow-var) If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](https://eslint.org/docs/rules/no-var)

    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```javascript
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```

  <a name="references--block-scope"></a><a name="2.3"></a>
  - [2.3](#references--block-scope) Note that both `let` and `const` are block-scoped, whereas `var` is function-scoped.

    ```javascript
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
      var c = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    console.log(c); // Prints 1
    ```

    In the above code, you can see that referencing `a` and `b` will produce a ReferenceError, while `c` contains the number. This is because `a` and `b` are block scoped, while `c` is scoped to the containing function.

**[⬆ back to top](#table-of-contents)**

    ```javascript
    // bad
    const items = new Array();
    ``` -->
