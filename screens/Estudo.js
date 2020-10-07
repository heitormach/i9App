import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { estudos } from "../constants/mocks";
const { width } = Dimensions.get("window");

class Estudo extends Component {
  state = {
    active: "Geral",
    estudos: [],
    estudoSelected: {
      conteudo: [],
    },
    showEstudo: false,
  };

  componentDidMount() {
    this.setState({ estudo: this.props.estudos });
  }

  handleTab = (tab) => {
    const { estudos } = this.props;
    const filtered = estudos.filter((estudo) =>
      estudo.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, estudos: filtered });
  };

  showModal(estudo) {
    this.setState({ estudoSelect: estudo, showEstudo: true });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  renderEstudo() {
    const { estudoSelected } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={this.state.showEstudo}
        onRequestClose={() => this.setState({ showEstudo: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            {estudoSelected.titulo}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            {estudoSelected.conteudo.map((est) => (
              <Block key={est.subTitulo}>
                <Text h3 light>
                  {est.subTitulo}
                </Text>
                {est.paragrafos.map((cont) => (
                  <Text
                    key={cont}
                    caption
                    gray
                    height={24}
                    style={{ marginBottom: theme.sizes.base }}
                  >
                    {cont}
                  </Text>
                ))}
              </Block>
            ))}
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showEstudo: false })}
            >
              <Text center white>
                Voltar
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const tabs = ["Geral"];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Estudo
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map((tab) => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.estudos}>
            {estudos.map((estudo) => (
              <TouchableOpacity
                key={estudo.nome}
                onPress={() => {
                  this.setState({ estudoSelected: estudo, showEstudo: true });
                }}
              >
                <Card
                  center
                  middle
                  color="#fffcfc"
                  shadow
                  style={styles.estudo}
                >
                  <Text center medium height={20}>
                    {estudo.nome}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
        {this.renderEstudo()}
      </Block>
    );
  }
}

Estudo.defaultProps = {
  profile: mocks.profile,
  estudos: mocks.estudos,
};

export default Estudo;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  estudos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  estudo: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
