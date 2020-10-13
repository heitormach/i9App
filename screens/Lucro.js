import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import moment from "moment";
const { width } = Dimensions.get("window");
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Picker } from "@react-native-community/picker";
import { AsyncStorage } from "react-native";
import apiTransacao from "../services/apiTransacao";

class Lucro extends Component {
  state = {
    lucros: [],
    usuario: {},
    meses: [
      { nome: "Janeiro", numero: 1 },
      { nome: "Fevereiro", numero: 2 },
      { nome: "Março", numero: 3 },
      { nome: "Abril", numero: 4 },
      { nome: "Maio", numero: 5 },
      { nome: "Junho", numero: 6 },
      { nome: "Julho", numero: 7 },
      { nome: "Agosto", numero: 8 },
      { nome: "Setembro", numero: 9 },
      { nome: "Outubro", numero: 10 },
      { nome: "Novembro", numero: 11 },
      { nome: "Dezembro", numero: 12 },
    ],
    mesSelected: new Date().getMonth() + 1,
    dataInicio: "2020-01-01",
    dataFim: "2020-12-31",
    loading: false,
  };

  componentDidMount() {
    // this.setState({ fats: this.props.fats });
    const { dataInicio, dataFim } = this.state;
    this.getTransacao(dataInicio, dataFim);
  }

  convertData(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  getTransacao = async (dataInicio, dataFim) => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    this.setState({ usuario: usuario });
    try {
      this.setState({ loading: true });
      const response = await apiTransacao.get("relatorio/lucro", {
        dataInicio: "2020-01-01",
        dataFim: "2020-12-31",
      });

      this.setState({ lucros: response.data });
      this.setState({ loading: false });
    } catch (err) {
      //console.log(err);
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    //  this.setState({ agends: this.props.agends });
    const { dataInicio, dataFim } = this.state;
    this.getTransacao(dataInicio, dataFim);
  }

  convertData(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  renderLucro(lucro) {
    return (
      <Block row card shadow color="#fffcfc" style={styles.fat}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.fatStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text size={10} white style={{ textTransform: "uppercase" }}>
              {lucro.mes}
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h4 white>
              R$ {Number(lucro.lucro).toFixed(2)}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h4 style={{ paddingVertical: 8 }}>
            Faturamentos: R$ {Number(lucro.faturamentos).toFixed(2)}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Despesas: - R$ {Number(lucro.despesas).toFixed(2)}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Lucro: R$ {Number(lucro.lucro).toFixed(2)}
          </Text>
          <Text caption semibold></Text>
        </Block>
      </Block>
    );
  }

  renderLucros() {
    const { lucros } = this.state;

    return (
      <Block flex={0.8} column style={styles.fats}>
        <SafeAreaView style={styles.safe}>
          {lucros.map((lucro) => (
            <TouchableOpacity key={lucro.mes} activeOpacity={0.8}>
              {this.renderLucro(lucro)}
            </TouchableOpacity>
          ))}
          {lucros.length === 0 && (
            <Block>
              <Text style={{ marginBottom: 50 }} center medium height={20}>
                Aqui você pode ver o lucro mensal do seu negócio, baseado nos
                faturamentos e despesas
              </Text>

              <Text style={{ marginBottom: 50 }} center medium height={20}>
                Nenhum faturamento ou despesa encontrados para este mês
              </Text>
            </Block>
          )}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { meses, mesSelected, loading } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Lucro Mensal
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {loading === true && <ActivityIndicator size="large" color="green" />}
          {loading === false && this.renderLucros()}
        </ScrollView>
      </Block>
    );
  }
}

Lucro.defaultProps = {
  profile: mocks.profile,
};

export default Lucro;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  lucros: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  lucro: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  fats: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  fatsHeader: {
    paddingHorizontal: 70,
    paddingBottom: 2,
  },
  fat: {
    padding: 20,
    marginBottom: 15,
  },
  fatStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90,
  },
  safe: {
    flex: 1,
  },
});
