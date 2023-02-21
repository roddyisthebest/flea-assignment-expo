import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './Tab';

const Nav = createNativeStackNavigator();
const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Tab" component={Tab} />
    </Nav.Navigator>
  );
};

export default Root;
