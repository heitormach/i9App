import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

import { mocks } from "../constants";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Planos extends Component {
  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  };

  renderPlanos() {
    const { planos } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={planos}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Block
            style={{ width, height: height / 2, overflow: "visible", top: 50 }}
          >
            <Text bold size={25} center>
              {item.nome}
            </Text>
            <Text style={{ top: 10 }} size={14} center>
              {item.descricao}
            </Text>
            <Text center size={20} style={{ top: 20 }}>
              R$ {item.preco.toFixed(2)}
            </Text>
          </Block>
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } },
          },
        ])}
      />
    );
  }

  renderSteps() {
    const { planos } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {planos.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 primary>
            Planos
          </Text>
          <Text h3 center gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Escolha ou altere para o plano que mais se adequar a você!
          </Text>
        </Block>
        <Block center middle>
          {this.renderPlanos()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Browse")}>
            <Text center semibold white>
              Quero esse!
            </Text>
          </Button>
          <Button shadow onPress={() => navigation.goBack()}>
            <Text center semibold>
              Voltar
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

Planos.defaultProps = {
  planos: mocks.planos,
};

export default Planos;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
