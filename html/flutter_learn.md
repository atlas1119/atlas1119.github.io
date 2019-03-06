# flutter

import 'package:flutter/material.dart';
import 'home/home_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '掘金Demo',
      theme: ThemeData(
        // This is the theme of your application.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: '功能'),
    );
  }
}

pubspec.yaml 类似于 package.json，包管理配置文件

channel 用于 dart 和 native通信

目前还没有较为成熟的webview plugin，官方给出了一个 webview_flutter 插件，但是内部api较少