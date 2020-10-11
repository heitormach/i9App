import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Servicos from "../screens/Servicos";
import Contatos from "../screens/Contatos";
import Horarios from "../screens/Horarios";
import Services from "../screens/Services";
import Faturamento from "../screens/Faturamento";
import FatMensal from "../screens/FatMensal";
import FatSemanal from "../screens/FatSemanal";
import FatDiario from "../screens/FatDiario";
import FatAnual from "../screens/FatAnual";
import Agendamento from "../screens/Agendamento";
import ServicosDia from "../screens/ServicosDia";
import Planos from "../screens/Planos";
import Estudo from "../screens/Estudo";
import Negocio from "../screens/Negocio";
import Endereco from "../screens/Endereco";
import Financeiro from "../screens/Financeiro";
import Despesas from "../screens/Despesas";
import Lucro from "../screens/Lucro";
import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot,
    Explore,
    Browse,
    Product,
    Settings,
    Servicos,
    Contatos,
    Horarios,
    Services,
    Faturamento,
    FatMensal,
    FatSemanal,
    FatDiario,
    FatAnual,
    Agendamento,
    ServicosDia,
    Planos,
    Estudo,
    Negocio,
    Endereco,
    Financeiro,
    Despesas,
    Lucro,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base,
      },
    },
  }
);

export default createAppContainer(screens);
