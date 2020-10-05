const categories = [
  {
    id: "agendamentos",
    name: "Agendamentos",
    tags: ["menu"],
    screen: "Agendamento",
    count: 147,
    image: require("../assets/icons/agendamentos.png"),
  },
  {
    id: "servicos",
    name: "Meu Negócio",
    tags: ["menu"],
    screen: "Servicos",
    count: 16,
    image: require("../assets/icons/servicos.png"),
  },
  {
    id: "faturas",
    name: "Faturamento",
    tags: ["menu"],
    screen: "Faturamento",
    count: 68,
    image: require("../assets/icons/fatura.png"),
  },
  {
    id: "planos",
    name: "Plano",
    screen: "Planos",
    tags: ["menu"],
    count: 17,
    image: require("../assets/icons/planos.png"),
  },
  {
    id: "estudo",
    name: "Estudo",
    tags: ["menu"],
    screen: "Estudo",
    count: 47,
    image: require("../assets/icons/estudo.png"),
  },
  {
    id: "ajuda",
    name: "Ajuda",
    tags: ["menu"],
    screen: "Ajuda",
    count: 47,
    image: require("../assets/icons/ajuda.png"),
  },
];

const servicos = [
  {
    id: "contatos",
    name: "Contatos",
    tags: ["geral"],
    screen: "Contatos",
    count: 147,
    image: require("../assets/icons/contatos.png"),
  },
  {
    id: "horarios",
    name: "Horários de Atendimento",
    tags: ["geral"],
    screen: "Horarios",
    count: 16,
    image: require("../assets/icons/relogio.png"),
  },
  {
    id: "services",
    name: "Serviços",
    tags: ["geral"],
    screen: "Services",
    count: 16,
    image: require("../assets/icons/relogio.png"),
  },
];

const faturamentos = [
  {
    id: "diario",
    name: "Diário",
    tags: ["geral"],
    screen: "FatDiario",
    count: 147,
    image: require("../assets/icons/contatos.png"),
  },
  {
    id: "semanal",
    name: "Semanal",
    tags: ["geral"],
    screen: "FatSemanal",
    count: 16,
    image: require("../assets/icons/relogio.png"),
  },
  {
    id: "mensal",
    name: "Mensal",
    tags: ["geral"],
    screen: "FatMensal",
    count: 16,
    image: require("../assets/icons/relogio.png"),
  },
  {
    id: "anual",
    name: "Anual",
    tags: ["geral"],
    screen: "FatAnual",
    count: 16,
    image: require("../assets/icons/relogio.png"),
  },
];

const dayWeek = [
  {
    id: "domingo",
    name: "Domingo",
    day: 1,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "segunda",
    name: "Segunda-Feira",
    day: 2,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "terca",
    name: "Terça-Feira",
    day: 3,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "quarta",
    name: "Quarta-Feira",
    day: 4,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "quinta",
    name: "Quinta-Feira",
    day: 5,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "sexta",
    name: "Sexta-Feira",
    day: 6,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
  {
    id: "sabado",
    name: "Sábado",
    day: 7,
    horaIni: new Date(),
    horaFim: new Date(),
    naoTrab: false,
  },
];

const fatMensal = [
  {
    id: 1,
    descricao: "Corte para cabelos curtos",
    nome: "Corte Curto",
    preco: 30,
    qtd: 25,
    total: 750.0,
  },
  {
    id: 2,
    descricao: "Corte para cabelos médios",
    nome: "Corte Médio",
    preco: 40,
    qtd: 10,
    total: 400.0,
  },
  {
    id: 3,
    descricao: "Corte para cabelos longos",
    nome: "Corte Longo",
    preco: 50,
    qtd: 5,
    total: 250,
  },
  {
    id: 4,
    descricao: "Coloração de cabelo",
    nome: "Coloração",
    preco: 100,
    qtd: 3,
    total: 300,
  },
  {
    id: 5,
    descricao: "Faça a barba",
    nome: "Barba",
    preco: 30,
    qtd: 10,
    total: 300,
  },
];

const contatos = [
  {
    ddd: 11,
    ind_whatsapp: true,
    numero: 999191751,
  },
  {
    ddd: 11,
    ind_whatsapp: false,
    numero: 42214783,
  },
];

const services = [
  {
    descricao: "Corte para cabelos curtos",
    nome: "Corte Curto",
    preco: 30,
  },
  {
    descricao: "Corte para cabelos médios",
    nome: "Corte Médio",
    preco: 40,
  },
  {
    descricao: "Corte para cabelos longos",
    nome: "Corte Longo",
    preco: 50,
  },
  {
    descricao: "Coloração de cabelo",
    nome: "Coloração",
    preco: 100,
  },
  {
    descricao: "Faça a barba",
    nome: "Barba",
    preco: 30,
  },
];

const agendamentos = [
  {
    id: 1,
    dia: "01",
    mes: "08",
    servicos: [
      {
        id: 1,
        descricao: "Corte para cabelos curtos",
        nome: "Corte Curto",
        preco: 30,
        hora: "10:00",
        cliente: "Maria",
        concluido: true,
      },
      {
        id: 2,
        descricao: "Corte para cabelos médios",
        nome: "Corte Médio",
        preco: 40,
        hora: "12:00",
        cliente: "Jorge",
        concluido: false,
      },
      {
        id: 3,
        descricao: "Corte para cabelos longos",
        nome: "Corte Longo",
        preco: 50,
        hora: "13:00",
        cliente: "Heitor Machado",
        concluido: false,
      },
      {
        id: 4,
        descricao: "Coloração de cabelo",
        nome: "Coloração",
        preco: 100,
        hora: "15:00",
        cliente: "Ana",
        concluido: false,
      },
      {
        id: 5,
        descricao: "Faça a barba",
        nome: "Barba",
        preco: 30,
        hora: "17:00",
        cliente: "Rogerio",
        concluido: false,
      },
    ],
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
  username: "heitor.machado@i9app.com.br",
  location: "Brasil",
  email: "heitor.machado@i9app.com.br",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

const estudos = [
  {
    nome: "Empreendedorismo",
    titulo: "O que é empreendedorismo?",
    conteudo: [
      {
        subTitulo: "",
        paragrafos: [
          "É identificar problemas e oportunidades, criar soluções e investir na criação de algo positivo para a sociedade. Pode ser um negócio, um projeto ou mesmo um movimento que gere mudanças reais e impacto no dia-a-dia das pessoas.",
          "A essência do empreendedorismo está na observação e no aproveitamento de novas oportunidades nos negócios.",
          "O Brasil apresenta grande potencial para o empreendedorismo. De acordo com A Global Entrepreneurship Monitor (GEM), a Taxa de Empreendedorismo Total no Brasil é de 38% (2018). São 52 milhões de brasileiros se dedicando ao próprio negócio.",
        ],
      },
      {
        subTitulo: "O que é ser empreendedor?",
        paragrafos: [
          "Empreendedorismo é sinônimo de dinheiro no bolso? O ideal é que a resposta seja positiva. Mas, na prática, nem sempre é assim. Muita gente pensa que quem tem um negócio próprio, literalmente, tem muito dinheiro - e toda pessoa que resolve e tem a coragem de empreender quer e merece, de fato, ter prosperidade.",
          "No entanto, ser empreendedor não é, literalmente, ter essa garantia. Muito antes, ser empreendedor é ter a ousadia de colocar suas ideias em práticas.",
          "Aproveitar as oportunidades do mercado e transformar crises em oportunidade é uma característica do brasileiro.",
        ],
      },
    ],
  },

  {
    nome: "Comunicação",
    titulo: "Comunicação com o cliente: vantagens de usar a tecnologia",
    conteudo: [
      {
        subTitulo: "",
        paragrafos: [
          "Para fazer o negócio crescer e gerar mais resultados, é necessário estar em constante comunicação com o cliente. Esse contato ajuda a fixar a marca na cabeça do público e fornece informações importantes para a administrar o negócio. O contato pode existir tanto pessoalmente como por meio da internet, utilizando alguma plataforma ou um outro veículo de comunicação.",
          "Hoje vamos falar sobre as maneiras de utilizar a tecnologia para manter um relacionamento entre público e empresa. Mostrar algumas vantagens de fazer a comunicação com o cliente por meio de aplicativos, redes sociais, e-mails e outras ferramentas similares.",
        ],
      },
      {
        subTitulo: "1. Comunicação com o cliente a qualquer hora e lugar",
        paragrafos: [
          "A primeira coisa que a gente pensa quando fala em comunicação com o cliente em ambientes digitais é na facilidade e agilidade com que ela torna possível o contato entre as pessoas.",
          "Como já nos acostumamos com esta comodidade no dia a dia, pode ser que não consigamos avaliar exatamente a sua dimensão. Para ficar mais fácil de perceber e até entender o quanto andamos dependentes da tecnologia, basta lembrar como era a vida sem um celular.",
          "Atualmente, esses aparelhos possibilitam que acessemos informações a qualquer hora e lugar e que pessoas em diferentes regiões (e até países) se comuniquem instantaneamente, tanto por meio de textos quanto por vídeos e áudios — e isso pode ser usado não somente para fins pessoais, mas também para fins profissionais.",
        ],
      },
      {
        subTitulo: "2. Processos repetitivos muito mais organizados",
        paragrafos: [
          "Imaginemos o serviço de uma secretária que precisa administrar uma agenda de horários em um caderno. Por não haver disponibilidade de acesso às informações, ela tem que atender individualmente cada pessoa.",
          "Já quando usamos um sistema aberto a todos os interessados, a comunicação com o cliente de que horários estão vagos e quais já foram ocupados acontece de forma mais rápida, eficiente e organizada.",
        ],
      },
      {
        subTitulo: "3. Custos menores",
        paragrafos: [
          "Soluções tecnológicas são normalmente mais baratas do que os meios tradicionais. Prova disso é a grande expansão do número de pessoas que se comunicam pelo WhatsApp, um aplicativo gratuito de comunicação que evita gastos com ligações telefônicas.",
          "Além disso, há também as redes sociais, que podem ser utilizadas para transmitir todas as informações que precisa a quem quer que seja caso o aparelho apresente problemas para realizar ligações.",
        ],
      },
      {
        subTitulo: "4. Conforto para todos",
        paragrafos: [
          "Outro benefício muito importante é a possibilidade de responder quando quiser. Se uma pessoa ligasse para você, seria preciso fazer uma escolha na hora, seja para aceitar a ligação ou não. Já no caso de uma comunicação com o cliente pelos meios digitais, é possível responder no mesmo instante ou optar por dar um retorno em outro horário.",
        ],
      },
      {
        subTitulo: "5. Relatórios e estatísticas na palma da mão",
        paragrafos: [
          "Principalmente quando o assunto é negócio, ter condições de mensurar os contatos que andam sendo feitos e seus resultados é uma grande vantagem. Se estivermos falando de um aplicativo preparado para facilitar a comunicação com o cliente e, além disso, conseguir mensurar o resultado desta comunicação, o benefício é ainda maior, já que a informação é qualificada.",
          "Poder contar com um software preparado para o controle de uma atividade específica vai ajudar tanto na melhoria do seu contato com o público como na gestão do próprio negócio.",
          "Se você conhece alguém que pode também se interessar por estas vantagens ou que precisa se atualizar um pouco mais, aproveite para compartilhar este conteúdo em suas redes sociais.",
        ],
      },
    ],
  },
];

const planos = [
  {
    id: 1,
    nome: "Mentor",
    preco: 0.0,
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum justo quis quam dictum mollis molestie eget velit. Curabitur vestibulum ultricies pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vulputate fermentum magna, non sodales tellus congue quis. Curabitur vestibulum sollicitudin imperdiet. Sed laoreet varius fringilla. Vivamus ligula turpis, lobortis et ante et, facilisis luctus quam. In venenatis volutpat iaculis. Nulla tempor felis et rutrum sagittis. Phasellus ornare tincidunt hendrerit. Nam condimentum laoreet nisl, nec fermentum nisi ultricies vel.",
  },
  {
    id: 2,
    nome: "Mentor Mais - Individual",
    preco: 30.0,
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum justo quis quam dictum mollis molestie eget velit. Curabitur vestibulum ultricies pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vulputate fermentum magna, non sodales tellus congue quis. Curabitur vestibulum sollicitudin imperdiet. Sed laoreet varius fringilla. Vivamus ligula turpis, lobortis et ante et, facilisis luctus quam. In venenatis volutpat iaculis. Nulla tempor felis et rutrum sagittis. Phasellus ornare tincidunt hendrerit. Nam condimentum laoreet nisl, nec fermentum nisi ultricies vel.",
  },
  {
    id: 3,
    nome: "Mentor Mais - Equipe",
    preco: 70.0,
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum justo quis quam dictum mollis molestie eget velit. Curabitur vestibulum ultricies pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vulputate fermentum magna, non sodales tellus congue quis. Curabitur vestibulum sollicitudin imperdiet. Sed laoreet varius fringilla. Vivamus ligula turpis, lobortis et ante et, facilisis luctus quam. In venenatis volutpat iaculis. Nulla tempor felis et rutrum sagittis. Phasellus ornare tincidunt hendrerit. Nam condimentum laoreet nisl, nec fermentum nisi ultricies vel.",
  },
];

export {
  categories,
  explore,
  products,
  profile,
  servicos,
  dayWeek,
  contatos,
  services,
  faturamentos,
  fatMensal,
  agendamentos,
  planos,
  estudos,
};
