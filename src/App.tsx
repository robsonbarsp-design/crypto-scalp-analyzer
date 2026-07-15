import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { AnalysisScreen } from './src/screens/AnalysisScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { CryptoProvider } from './src/context/CryptoContext';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <CryptoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: COLORS.secondary,
              borderTopColor: COLORS.dark,
              borderTopWidth: 1,
              paddingBottom: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 4,
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.neutral,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
            }}
          />
          <Tab.Screen
            name="Analysis"
            component={AnalysisScreen}
            options={{
              tabBarLabel: 'Análise',
              tabBarIcon: ({ color }) => <TabIcon icon="📊" color={color} />,
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarLabel: 'Histórico',
              tabBarIcon: ({ color }) => <TabIcon icon="📈" color={color} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CryptoProvider>
  );
};

interface TabIconProps {
  icon: string;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color }) => (
  <Text style={{ fontSize: 20, color, opacity: color === COLORS.primary ? 1 : 0.6 }}>
    {icon}
  </Text>
);

export default App;
