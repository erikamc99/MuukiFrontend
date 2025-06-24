import styles from '../../styles/auth/LoginScreenStyles';
import LoginForm from '../../components/LoginForm'
import { View, Image } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Image source={'../../assets/img/logo-alargado.PNG'} style={styles.logo} />
            <LoginForm />
        </View>
    )
}