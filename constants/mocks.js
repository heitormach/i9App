const categories = [
  {
    id: "agendamentos",
    name: "Agendamentos",
    tags: ["menu"],
    count: 147,
    image: require("../assets/icons/agendamentos.png"),
  },
  {
    id: "servicos",
    name: "Serviços",
    tags: ["menu"],
    count: 16,
    image: require("../assets/icons/servicos.png"),
  },
  {
    id: "faturas",
    name: "Faturamento",
    tags: ["menu"],
    count: 68,
    image: require("../assets/icons/fatura.png"),
  },
  {
    id: "planos",
    name: "Plano",
    tags: ["menu"],
    count: 17,
    image: require("../assets/icons/planos.png"),
  },
  {
    id: "estudo",
    name: "Estudo",
    tags: ["menu"],
    count: 47,
    image: require("../assets/icons/estudo.png"),
  },
  {
    id: "ajuda",
    name: "Ajuda",
    tags: ["menu"],
    count: 47,
    image: require("../assets/icons/ajuda.png"),
  },
];

const products = [
  {
    id: 1,
    name: "16 Best Plants That Thrive In Your Bedroom",
    description:
      "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
    ],
  },
];

const explore = [
  // images
  require("../assets/images/explore_1.png"),
  require("../assets/images/explore_2.png"),
  require("../assets/images/explore_3.png"),
  require("../assets/images/explore_4.png"),
  require("../assets/images/explore_5.png"),
  require("../assets/images/explore_6.png"),
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export { categories, explore, products, profile };
