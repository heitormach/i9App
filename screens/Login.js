import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "../services/api";

export default class Login extends Component {
  state = {
    login: "",
    senha: "",
    errors: [],
    tipo_usuario: "PRESTADOR",
    loading: false,
  };

  handleLogin = async () => {
    const { navigation } = this.props;
    const { login, senha, tipo_usuario } = this.state;
    try {
      this.setState({ loading: true });

      const response = await api.post("/usuario/token", null, {
        params: {
          login: login,
          senha: senha,
          tipo_usuario: tipo_usuario,
        },
      });

      await AsyncStorage.multiSet([
        ["@i9App:token", token],
        ["@i9App:user", JSON.stringify(response.data)],
      ]);

      Keyboard.dismiss();

      this.setState({ loading: false });

      navigation.navigate("Browse");
    } catch (err) {
      Alert.alert("ERRO", "Erro ao realizar login");
      this.setState({ loading: false });
      navigation.navigate("Browse");
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Entrar
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input]}
              defaultValue={""}
              onChangeText={(text) => this.setState({ login: text })}
            />
            <Input
              secure
              label="Senha"
              error={hasErrors("password")}
              style={[styles.input]}
              defaultValue={""}
              onChangeText={(text) => this.setState({ senha: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Esqueceu a senha?
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
});
