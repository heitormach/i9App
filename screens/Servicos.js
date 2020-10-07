import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import apiNegocio from "../services/apiNegocio";

const { width } = Dimensions.get("window");

class Servicos extends Component {
  state = {
    active: "Geral",
    servicos: [],
    negocio: {},
  };

  componentDidMount() {
    this.setState({ servicos: this.props.servicos });
  }

  handleTab = (tab) => {
    const { servicos } = this.props;
    const filtered = servicos.filter((servico) =>
      servico.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, servicos: filtered });
  };

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

  render() {
    const { profile, navigation } = this.props;
    const { servicos } = this.state;
    const tabs = ["Geral"];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Meu Negócio
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
          <Block flex={false} row space="between" style={styles.servicos}>
            {servicos.map((servico) => (
              <TouchableOpacity
                key={servico.name}
                onPress={() => navigation.navigate(servico.screen, { servico })}
              >
                <Card
                  color="#fffcfc"
                  center
                  middle
                  shadow
                  style={styles.servico}
                >
                  <Badge margin={[0, 0, 15]} size={40}>
                    <Image source={servico.image} />
                  </Badge>
                  <Text center medium height={20}>
                    {servico.name}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Servicos.defaultProps = {
  profile: mocks.profile,
  servicos: mocks.servicos,
};

export default Servicos;

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
  servicos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  servico: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
