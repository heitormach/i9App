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
} from "react-native";

import { Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const { width } = Dimensions.get("window");
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";

class FatSemanal extends Component {
  state = {
    faturamentos: [],
    isDateTimePickerVisible: false,
    faturamentoSelected: {},
    showWeek: false,
    horaSelected: {},
    showTimePicker: false,
    meses: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    mesSelected: "Agosto",
  };

  componentDidMount() {
    this.setState({ fats: this.props.fats });
  }

  selectWeekDay(faturamento) {
    this.setState({ faturamentoSelected: faturamento, showWeek: true });
  }

  horaSelected(faturamento, tipo) {
    this.setState({
      horaSelected: { hora: faturamento, tipo: tipo },
      showTimePicker: true,
    });
  }

  handleTime(event, date, tipo) {
    this.setState({ showTimePicker: false });
    if (tipo === "ini") {
      this.state.faturamentoSelected.horaIni = new Date(date);
    } else {
      this.state.faturamentoSelected.horaFim = new Date(date);
    }
  }

  renderChart() {
    const { fats } = this.props;

    return (
      <Block row card shadow color="white" style={styles.fats}>
        <Block
          style={{ flexDirection: "row", height: 150, paddingVertical: 5 }}
        >
          <YAxis
            data={fats}
            yAccessor={({ index }) => index}
            contentInset={{ top: 10, bottom: 10 }}
            scale={scale.scaleBand}
            spacing={0.2}
            formatLabel={(_, index) => fats[index].nome}
          />
          <BarChart
            style={{ flex: 1, marginLeft: 8 }}
            data={fats}
            horizontal={true}
            yAccessor={({ item }) => item.qtd * item.total}
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

  renderSelectTimeWeek() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showWeek}
        onRequestClose={() => this.setState({ showWeek: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            {this.state.faturamentoSelected.name}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(this.state.faturamentoSelected.horaIni, "ini")
              }
            >
              <Text
                h2
                light
                size={15}
                style={{ marginBottom: theme.sizes.base }}
              >
                Horário de Início:
                {moment(
                  new Date(this.state.faturamentoSelected.horaIni)
                ).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(this.state.faturamentoSelected.horaFim, "fim")
              }
            >
              <Text
                h2
                light
                size={15}
                style={{ marginBottom: theme.sizes.base }}
              >
                Horário de Término:
                {moment(
                  new Date(this.state.faturamentoSelected.horaFim)
                ).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            {this.state.showTimePicker && (
              <DateTimePicker
                value={new Date(this.state.horaSelected.hora)}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) =>
                  this.handleTime(event, date, this.state.horaSelected.tipo)
                }
              />
            )}
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>Não trabalho</Text>
              <Switch
                value={this.state.faturamentoSelected.naoTrab}
                onValueChange={(value) =>
                  (this.state.faturamentoSelected.naoTrab = value)
                }
              />
            </Block>
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showWeek: false })}>
              <Text center white>
                Salvar
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderTotal() {
    return (
      <Block row card shadow color="white" style={styles.fat}>
        <Block flex={0.25} card column color="orange" style={styles.fatStatus}>
          <Block flex={0.25} middle center color={theme.colors.accent}>
            <Text size={10} white style={{ textTransform: "uppercase" }}>
              TOTAL
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h4 white>
              R$ 2.000
            </Text>
            <Text h5 white>
              53 feitos
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h4 style={{ paddingVertical: 8 }}>
            Você realizou 53 serviços na semana
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Valor Total Arrecadado: R$ 2.000,00
          </Text>
          <Text caption semibold></Text>
        </Block>
      </Block>
    );
  }

  renderFat(fat) {
    return (
      <Block row card shadow color="white" style={styles.fat}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.fatStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text size={10} white style={{ textTransform: "uppercase" }}>
              {fat.nome}
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              R$ {fat.total}
            </Text>
            <Text h5 white>
              {fat.qtd} feitos
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h4 style={{ paddingVertical: 8 }}>
            Você realizou {fat.qtd} {fat.nome}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Valor Arrecadado: R$ {fat.total}
          </Text>
          <Text caption semibold></Text>
        </Block>
      </Block>
    );
  }

  renderFats() {
    const { fats } = this.props;

    return (
      <Block flex={0.8} column style={styles.fats}>
        <SafeAreaView style={styles.safe}>
          {this.renderTotal()}
          {fats.map((fat) => (
            <TouchableOpacity activeOpacity={0.8} key={`fat-${fat.id}`}>
              {this.renderFat(fat)}
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { meses } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Faturamento Semanal
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <Block
          flex={false}
          row
          space="between"
          style={styles.fatsHeader}
        ></Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {this.renderChart()}
          {this.renderFats()}
        </ScrollView>
      </Block>
    );
  }
}

FatSemanal.defaultProps = {
  profile: mocks.profile,
  fats: mocks.fatMensal,
};

export default FatSemanal;

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
