import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Root from './index';

export default function Wrapper() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Root />
    </GestureHandlerRootView>
  );
}
