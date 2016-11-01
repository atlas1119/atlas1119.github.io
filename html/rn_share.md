# React Native开发IOS心得

react native navigation 是个不错的第三方插件，但是之前遇到一个bug，花了我好长时间解决，就是TouchableHighlight等组件，onpress时有时会出现界面卡死现象，这个问题其实是interactivePopGestureRecognizer引起的，稍微修改了下源码，搞定问题

    //Bug fix: in case there is a interactivePopGestureRecognizer, it prevents react-native from getting touch events on the left screen area that the gesture handles
       //overriding the delegate of the gesture prevents this from happening while keeping the gesture intact (another option was to disable it completely by demand)
       self.originalInteractivePopGestureDelegate = nil;
       NSNumber *interactivePopGesture = self.navigatorStyle[@"interactivePopGesture"];
       if (self.navigationController != nil && self.navigationController.interactivePopGestureRecognizer != nil)
       {
         id <UIGestureRecognizerDelegate> interactivePopGestureRecognizer = self.navigationController.interactivePopGestureRecognizer.delegate;
         if (interactivePopGestureRecognizer != nil)
         {
           self.originalInteractivePopGestureDelegate = interactivePopGestureRecognizer;
           //self.navigationController.interactivePopGestureRecognizer.delegate = self;
           self.navigationController.interactivePopGestureRecognizer.enabled = interactivePopGesture ? [interactivePopGesture boolValue] : YES;
         }
       }
