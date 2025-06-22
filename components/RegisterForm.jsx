import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/components/RegisterFormStyles";
import FormButton from "./FormButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register, loading, error } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleRegister = async () => {
    if (!username || !name || !email || !password || !confirmPassword) {
      setLocalError("*Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }
    setLocalError("");
    await register({ username, name, email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FormButton onPress={handleRegister} text="REGISTRARSE" style={{ opacity: loading ? 0.5 : 1 }} />
      <View style={styles.loginPrompt}>
        <Text>¿Ya está registrado? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Inicie sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}