# Nodejs require加载机制

Node.js 的模块可以分为两大类，一类是核心模块，另一类是文件模块

Node.js 标准 API 中提供的模块，如 fs、http、net、vm 等，这些都是由 Node.js 官方提供 的模块，编译成了二进制代码。我们可以直接通过 require 获取核心模块，例如 require('fs')。核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突， Node.js 总是会加载核心模块。
文件模块则是存储为单独的文件(或文件夹)的模块，可能是 JavaScript 代码、JSON 或 编译好的 C/C++ 代码。文件模块的加载方法相对复杂，但十分灵活，尤其是和 npm 结合使 用时。在不显式指定文件模块扩展名的时候，Node.js 会分别试图加上 .js、.json 和 .node扩展 名。.js 是 JavaScript 代码，.json 是 JSON 格式的文本，.node 是编译好的 C/C++ 代码。

加载缓存

Node.js 模块不会被重复加载，这是因为 Node.js 通过文件名缓存所 有加载过的文件模块，所以以后再访问到时就不会重新加载了。注意，Node.js 是根据实际文 件名缓存的，而不是 require() 提供的参数缓存的，也就是说即使你分别通过 require('express') 和 require('./node_modules/express') 加载两次，也不会重 复加载，因为尽管两次参数不同，解析到的文件却是同一个。


下面总结一下使用 require(some_module) 时的加载顺序。
(1) 如果some_module 是一个核心模块，直接加载，结束。
(2) 如果some_module以“ / ”、“ ./ ”或“ ../ ”开头，按路径加载 some_module，结束。 (3) 假设当前目录为 current_dir，按路径加载 current_dir/node_modules/some_module。
     如果加载成功，结束。
     如果加载失败，令current_dir为其父目录。
     重复这一过程，直到遇到根目录，抛出异常，结束。
