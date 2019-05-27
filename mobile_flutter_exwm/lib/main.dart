import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        "/": (_) => SafeArea(
              child: WebviewScaffold(
                url: "https://exwm.timgrohmann.de/",
              ),
            ),
      },
    );
  }
}
