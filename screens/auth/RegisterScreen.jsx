import styles from '../../styles/auth/RegisterScreenStyles';
import RegisterForm from '../../components/RegisterForm'
import { View, Image } from 'react-native';


export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Image source={'../../assets/img/logo-alargado.PNG'} style={styles.logo} />
            <RegisterForm />
        </View>
    )
}