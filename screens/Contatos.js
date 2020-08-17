import React, { Component } from "react";
import { Button, Block, Text, Card } from "../components";
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme, mocks } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Container } from './styles';

const { width } = Dimensions.get("window");

class Contatos extends Component {
  state = {
    active: "Geral",
    contatos: [],
    visibleModal: false,
  };

  componentDidMount = () => {
    this.setState({ contatos: this.props.contatos });
  };

  setModal = () => {
    this.state.visibleModal = true;
  };

  render() {
    const { profile, navigation } = this.props;
    const { contatos } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Contatos
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <KeyboardAvoidingView>
          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              placeholder="Pesquisar"
              maxLength={25}
            />
            <TouchableOpacity style={styles.Button}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: theme.sizes.base * 2 }}
          >
            <Block flex={false} row space="between" style={styles.contatos}>
              {contatos.map((contato) => (
                <TouchableOpacity key={contato.numero}>
                  <Card center middle shadow style={styles.contato}>
                    <Text center medium height={20}>
                      {contato.ddd} - {contato.numero}
                    </Text>
                    {contato.ind_whatsapp && (
                      <Text center medium color="green">
                        WhatsApp
                      </Text>
                    )}
                  </Card>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

Contatos.defaultProps = {
  profile: mocks.profile,
  contatos: mocks.contatos,
};

export default Contatos;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  contatos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  Form: {
    padding: theme.sizes.base * 2,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10,
  },
  FlatList: {
    flex: 1,
    marginTop: 5,
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  contato: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
});
