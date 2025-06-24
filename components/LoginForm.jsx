import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/components/LoginFormStyles";
import FormButton from "./FormButton";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function LoginForm() {
  const { login, loading, error } = useContext(UserContext);
  const navigation = useNavigation();
  const [userOrEmail, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    console.log("Login intentado", userOrEmail, password);
    await login(userOrEmail, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario o correo electrónico"
        style={styles.input}
        value={userOrEmail}
        onChangeText={setInput}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <ForgotPasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSend={() => {}}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.linkText}>¿Ha olvidado su contraseña?</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FormButton onPress={handleLogin} text="INICIAR SESIÓN" style={{ opacity: loading ? 0.5 : 1 }} />
      <View style={styles.loginPrompt}>
        <Text>¿Aún no se ha registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginLink}>Regístrese</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}