import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";
import moment from "moment";
import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import { AsyncStorage } from "react-native";

class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    email: null,
    profile: {},
    username: null,
    password: null,
    c_password: null,
    errors: [],
    usuario: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
    this.getUsuario();
  }

  handleEdit(name, text) {
    const { usuario } = this.state;
    profile[name] = text;

    this.setState({ usuario });
  }

  getUsuario = async () => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    this.setState({ usuario: usuario });
  };

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { usuario, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={usuario[name]}
          onChangeText={(text) => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{usuario[name]}</Text>;
  }

  render() {
    const { profile, editing, usuario } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Configurações
          </Text>
          <Button>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Text>{usuario.email}</Text>
            <Input
              email
              label="Email"
              style={[styles.input]}
              defaultValue={usuario.email}
              onChangeText={(text) => {
                usuario.email = text;
                usuario.dados_login.login = text;
              }}
            />
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
