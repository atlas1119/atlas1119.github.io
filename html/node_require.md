# Nodejs require加载机制

Node.js 的模块可以分为两大类，一类是核心模块，另一类是文件模块

Node.js 标准 API 中提供的模块，如 fs、http、net、vm 等，这些都是由 Node.js 官方提供 的模块，编译成了二进制代码。我们可以直接通过 require 获取核心模块，例如 require('fs')。核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突， Node.js 总是会加载核心模块。
文件模块则是存储为单独的文件(或文件夹)的模块，可能是 JavaScript 代码、JSON 或 编译好的 C/C++ 代码。文件模块的加载方法相对复杂，但十分灵活，尤其是和 npm 结合使 用时。在不显式指定文件模块扩展名的时候，Node.js 会分别试图加上 .js、.json 和 .node扩展 名。.js 是 JavaScript 代码，.json 是 JSON 格式的文本，.node 是编译好的 C/C++ 代码。
