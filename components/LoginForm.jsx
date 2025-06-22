import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/components/LoginFormStyles";
import FormButton from "./FormButton";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    await login(input, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={input}
        onChangeText={setInput}
        autoCapitalize="none"
        keyboardType="email-address"
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