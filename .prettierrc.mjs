export default {
    printWidth: 100, // 每行代码的最大长度
    tabWidth: 4, // 缩进的空格数
    useTabs: false, // 使用空格而不是制表符
    semi: true, // 语句末尾添加分号
    singleQuote: true, // 使用单引号而不是双引号
    quoteProps: 'as-needed', // 对象属性名仅在必要时使用引号
    jsxSingleQuote: false, // JSX中使用双引号而不是单引号
    trailingComma: 'es5', // 在对象、数组等的最后一个元素后添加逗号
    bracketSpacing: true, // 在对象字面量的括号之间添加空格
    jsxBracketSameLine: false, // JSX的多行元素的右括号放置在最后一行的末尾
    bracketSameLine: false, // 对于HTML、JSX等，右括号是否放在最后一行的末尾
    arrowParens: 'avoid', // 箭头函数的参数周围省略括号（仅当只有一个参数时）
    endOfLine: 'crlf', // 根据系统自动检测换行符
    embeddedLanguageFormatting: 'auto', // 自动格式化嵌入的语言
    vueIndentScriptAndStyle: false, // 在Vue文件中，script和style标签内的内容不缩进
    singleAttributePerLine: false, // 每个属性占一行
    htmlWhitespaceSensitivity: 'css', // 根据CSS的规则处理HTML中的空白
    requirePragma: false, // 需要在文件头部添加特定的注释才能格式化
    insertPragma: false, // 在文件头部插入特定的注释
    proseWrap: 'preserve', // 保留Markdown等格式文本中的换行符
};
