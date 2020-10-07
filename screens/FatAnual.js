import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import moment from "moment";
const { width } = Dimensions.get("window");
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Picker } from "@react-native-community/picker";
import { AsyncStorage } from "react-native";
import apiTransacao from "../services/apiTransacao";

class FatAnual extends Component {
  state = {
    faturamentos: {
      quantidade_total: 0,
      servicos: [
        {
          percentual_valor_total: 0,
          quantidade: 0,
          servico: {
            descricao: "",
            nome: "",
            preco: 0,
          },
          valor: 0,
        },
      ],
      valor_total: 0,
    },
    isDateTimePickerVisible: false,
    faturamentoSelected: {},
    showWeek: false,
    horaSelected: {},
    showTimePicker: false,
    usuario: {},
    anos: [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ],
    anoSelected: String(new Date().getFullYear()),
    dataInicio: new Date(new Date().getFullYear(), 1, 1),
    dataFim: new Date(new Date().getFullYear(), 12, 31),
    loading: false,
  };

  componentDidMount() {
    // this.setState({ fats: this.props.fats });
    const { dataInicio, dataFim } = this.state;
    this.getTransacao(dataInicio, dataFim);
  }

  selectWeekDay(faturamento) {
    this.setState({ faturamentoSelected: faturamento, showWeek: true });
  }

  convertData(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  getTransacao = async (dataInicio, dataFim) => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    this.setState({ usuario: usuario });

    try {
      this.setState({ loading: true });
      const response = await apiTransacao.get("transacao/relatorio", {
        cpfPropietarioEstabelecimento: usuario.cpf,
        dataInicio: this.convertData(dataInicio),
        dataFim: this.convertData(dataFim),
      });

      this.setState({ faturamentos: response.data });
      this.setState({ loading: false });
    } catch (err) {
      //console.log(err);
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({ loading: false });
    }
  };

  onChangeYear(year) {
    this.setState({ anoSelected: year });
    this.getTransacao(new Date(year, 1, 1), new Date(year, 12, 31));
  }

  renderChart() {
    const { faturamentos } = this.state;

    return (
      <Block row card shadow color="white" style={styles.fats}>
        <Block
          style={{ flexDirection: "row", height: 150, paddingVertical: 5 }}
        >
          <YAxis
            data={faturamentos.servicos}
            yAccessor={({ index }) => index}
            contentInset={{ top: 10, bottom: 10 }}
            scale={scale.scaleBand}
            spacing={0.2}
            formatLabel={(_, index) =>
              faturamentos.servicos[index].servico.nome
            }
          />
          <BarChart
            style={{ flex: 1, marginLeft: 8 }}
            data={faturamentos.servicos}
            horizontal={true}
            yAccessor={({ item }) => Number(item.percentual_valor_total)}
            svg={{ fill: theme.colors.primary }}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.2}
            gridMin={0}
          >
            <Grid direction={Grid.Direction.VERTICAL} />
          </BarChart>
        </Block>
      </Block>
    );
  }

  renderTotal() {
    const { faturamentos } = this.state;
    return (
      <Block row card shadow color="#fffcfc" style={styles.fat}>
        <Block flex={0.25} card column color="orange" style={styles.fatStatus}>
          <Block flex={0.25} middle center color={theme.colors.accent}>
            <Text size={10} white style={{ textTransform: "uppercase" }}>
              TOTAL
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h4 white>
              R$ {Number(faturamentos.valor_total).toFixed(2)}
            </Text>
            <Text h5 white>
              {faturamentos.quantidade_total} feitos
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h4 style={{ paddingVertical: 8 }}>
            Você realizou {faturamentos.quantidade_total} serviços no ano
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Valor Total Arrecadado: R$ {faturamentos.valor_total}
          </Text>
          <Text caption semibold></Text>
        </Block>
      </Block>
    );
  }

  renderFat(fat) {
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
            <Text size={10} white style={{ textTransform: "uppercase" }}></Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              R$ {fat.valor}
            </Text>
            <Text h5 white>
              {fat.quantidade} feitos
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h4 style={{ paddingVertical: 8 }}>
            Você realizou {fat.quantidade} {fat.servico.nome}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Valor Arrecadado: R$ {Number(fat.valor).toFixed(2)}
          </Text>
          <Text caption semibold></Text>
        </Block>
      </Block>
    );
  }

  renderFats() {
    const { faturamentos } = this.state;

    return (
      <Block flex={0.8} column style={styles.fats}>
        <SafeAreaView style={styles.safe}>
          {this.renderTotal()}
          {faturamentos.servicos.map((fat) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={`fat-${fat.percentual_valor_total}${fat.valor}`}
            >
              {this.renderFat(fat)}
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { anos, anoSelected, loading } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Faturamento Anual
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <Block flex={false} row space="between" style={styles.fatsHeader}>
          <Picker
            style={{
              height: 50,
              width: 200,
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            }}
            selectedValue={anoSelected}
            onValueChange={(v) => this.onChangeYear(v)}
            itemStyle={{ fontSize: 20 }}
          >
            {anos.map((ano) => (
              <Picker.Item key={`ano-${ano}`} label={ano} value={ano} />
            ))}
          </Picker>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {loading === true && <ActivityIndicator size="large" color="green" />}
          {loading === false && this.renderChart()}
          {loading === false && this.renderFats()}
        </ScrollView>
      </Block>
    );
  }
}

FatAnual.defaultProps = {
  profile: mocks.profile,
  fats: mocks.fatMensal,
};

export default FatAnual;

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
  faturamentos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  faturamento: {
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
