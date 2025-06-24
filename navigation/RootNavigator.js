import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useUser } from '../context/UserContext';

export default function RootNavigator() {
    const { user, loading } = useUser();

    if (loading) return null;

    return (
        <NavigationContainer>
            {user ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}