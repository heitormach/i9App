const apiKey = "AIzaSyCWek3uRhvxP2ZRQhgMe5WwjMkJ1ypq39o";
const categories = [
  {
    id: "servicos",
    name: "Meu Negócio",
    tags: ["menu"],
    screen: "Servicos",
    count: 16,
    image: require("../assets/icons/servicos.png"),
  },
  {
    id: "agendamentos",
    name: "Agendamentos",
    tags: ["menu"],
    screen: "Agendamento",
    count: 147,
    image: require("../assets/icons/agendamentos.png"),
  },
  {
    id: "faturas",
    name: "Financeiro",
    tags: ["menu"],
    screen: "Financeiro",
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
];

const financeiro = [
  {
    id: "faturas",
    name: "Faturamento",
    tags: ["menu"],
    screen: "Faturamento",
    count: 68,
    image: require("../assets/icons/dinheiro.png"),
  },
  {
    id: "despesa",
    name: "Despesas",
    tags: ["menu"],
    screen: "Despesas",
    count: 16,
    image: require("../assets/icons/despesas.png"),
  },
  {
    id: "lucro",
    name: "Lucro",
    tags: ["menu"],
    screen: "Lucro",
    count: 147,
    image: require("../assets/icons/lucro.png"),
  },
];

const servicos = [
  {
    id: "negocio",
    name: "Dados do Negócio",
    tags: ["geral"],
    screen: "Negocio",
    count: 147,
    image: require("../assets/icons/dados_negocio.png"),
  },
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
    image: require("../assets/icons/services.png"),
  },
  {
    id: "endereco",
    name: "Endereço",
    tags: ["geral"],
    screen: "Endereco",
    count: 16,
    image: require("../assets/icons/endereco.png"),
  },
];

const faturamentos = [
  /* {
    id: "diario",
    name: "Diário",
    tags: ["Geral"],
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
  }, */
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
  {
    nome: "Marketing",
    titulo: "4 práticas de marketing que todo empreendedor deveria saber",
    conteudo: [
      {
        subTitulo: "",
        paragrafos: [
          "Sabemos que um empreendedor precisa lidar com muitas tarefas em seu dia a dia, principalmente no início do negócio, já que ele é o responsável por diversas áreas.",
          "Isso faz com que o seu tempo fique muito dividido e a sua rotina seja extremamente intensa e corrida. Nesse sentido, pode ser que alguns setores ganhem mais atenção do que outros, dependendo das suas prioridades e do próprio perfil de quem está empreendendo.",
          "Mas há algumas delas que são essenciais para que o negócio possa caminhar bem.Uma delas é o marketing. Ele é essencial para interagir com o seu público-alvo, trazer novos clientes e manter os antigos confiantes no seu serviço ou produto.",
          "Por isso, é importante que o dono do negócio esteja inteirado sobre o que há de novo nessa área, além de ferramentas e metodologias que já estão consolidadas no mercado. Então, listamos aqui 7 práticas de marketing que todo empreendedor deveria saber. Confira:",
        ],
      },
      {
        subTitulo: "1. Construção da marca",
        paragrafos: [
          "Todo empreendedor possui um ideal ao criar um negócio. Então, é preciso utilizar essa motivação para construir uma marca que seja sólida e comprometida com seus clientes. Independente do tamanho e do setor da empresa, é fundamental que ela transmita credibilidade para que as pessoas acreditem no seu trabalho.",
          "Afinal, o empreendedor é a “cara” da empresa, ou seja, precisa ser a pessoa mais capacitada para garantir que o negócio tenha uma imagem positiva e, assim, tornar-se referência no que faz.",
        ],
      },
      {
        subTitulo: "2. Conhecimento do seu público-alvo",
        paragrafos: [
          "É preciso conhecer quem é o seu público-alvo e definir quem poderá ser o seu futuro cliente.",
          "O público-alvo é algo mais genérico e portanto mais fácil de definir. Ele nada mais é do que um grupo de pessoas que possui as mesmas características que se encaixam no público que pode utilizar o seu produto ou serviço em algum momento da vida. Por exemplo: Gerentes de Marketing, de 25 a 35 anos, com renda média de R$5 mil.",
        ],
      },
      {
        subTitulo: "3. Marketing de divulgação e venda",
        paragrafos: [
          'Saber divulgar e vender o seu produto também é uma das práticas de marketing que deve estar na lista de "conhecimento obrigatório" para todo empreendedor. O motivo para isso é simples: se o empreendedor não sabe divulgar e vender o seu produto, quem saberá?',
          "Portanto, é preciso que ele entenda que esse assunto deve ser uma das principais prioridades em sua rotina. Sendo assim, ele deve definir ações que sejam objetivas e implementá-las ao longo de sua jornada empreendedora.",
        ],
      },
      {
        subTitulo: "4. Experiência e engajamento do cliente",
        paragrafos: [
          "Quando chegamos no ponto da experiência do cliente é possível desenvolver estratégias que atendam às suas necessidades. Isso vai melhorar a sua experiência de compra ao levar em consideração a sua jornada de compra.",
          "Então, é preciso entender como ele se sente e o que pode ser benéfico para ele. Assim, a sua marca consegue agregar valor logo no início desse relacionamento e por toda a sua vida.",
          "Existem diversas estratégias e boas práticas para fazer isso. Podemos citar as redes sociais como uma ferramenta importante para entender o engajamento do cliente. Pelo Facebook e Instagram, por exemplo, é possível saber o quanto ele acompanha a empresa, compartilha e interage com seus conteúdos.",
          "Fazendo esse levantamento você desenvolve cada vez mais ações que podem trabalhar a aproximação constante do cliente com a sua marca.",
        ],
      },
    ],
  },
  {
    nome: "Lucro",
    titulo: "3 passos para aumentar os lucros da sua empresa",
    conteudo: [
      {
        subTitulo: "",
        paragrafos: [
          "Como aumentar o lucro da empresa? Se a sua resposta é somente aumentar as vendas, você está prestes a cometer um erro comum. Muitos gestores acreditam que ter mais lucro é igual a entrar mais dinheiro! É óbvio que fazer mais negócios é parte considerável do faturamento, porém tão importante quanto isso é sair menos dinheiro dos seus cofres.",
          "Ou seja, uma das estratégias para manter o seu fluxo de caixa positivo é diminuir os custos das suas operações. Desta forma, seus lucros vão crescer mesmo que você mantenha o mesmo número de negociações. Além disso, é uma boa ideia investir em programas, treinamentos e outras iniciativas que você verá agora.",
          "Saiba, a seguir, como aumentar os seus lucros e garantir o sucesso a longo prazo da sua companhia.",
        ],
      },
      {
        subTitulo: "1. Tenha controle sobre as despesas",
        paragrafos: [
          "Quanto custa para sua empresa o uso mensal de água? E os gastos com materiais de limpeza? Se você não tem na ponta da língua essas respostas, falta-lhe algo essencial para aumentar os lucros da sua empresa: controle.",
          "Manter o domínio sobre o orçamento de todos os setores é primordial para a saúde financeira de qualquer organização. Somente por meio do monitoramento constante, você será capaz de identificar onde o gasto é maior e o que pode ser feito para reduzi-lo. No início, esse levantamento significa muito trabalho, mas depois será uma ferramenta incrível para aumentar o faturamento.",
        ],
      },
      {
        subTitulo: "2. Separe as contas",
        paragrafos: [
          "Todo o lucro da empresa pertence a você? Claro que não! Não é porque a empresa é sua que todo dinheiro vai direto para o seu bolso! Para ter mais lucro é necessário separar as contas pessoais das empresariais.",
          "Na prática, você tem que ter contas bancárias separadas e manter os débitos do dia a dia independentes. A parcela do seu carro novo não deve estar na programação financeira da empresa está errado, por exemplo. Ou se a fatura das passagens aéreas das suas férias vai direto para o setor de compras, também não funciona. Para evitar essa confusão, mantenha um pró-labore que varie de acordo com o faturamento da organização.",
        ],
      },
      {
        subTitulo: "3. Trate bem o cliente",
        paragrafos: [
          "Já passou o tempo em que os clientes ficavam presos à marca somente por tradição ou por não existir outras opções. Atualmente, o cliente é fiel à qualidade do produto e preço. Há alguns que também se preocupam com a responsabilidade social da marca e até questões de sustentabilidade entram na balança.",
          "Logo, é requisito básico tratar bem o cliente, atender as suas necessidades e ir além no pós-venda. SAC que não funciona, vendedor que não escuta ou empresa que só quer aumentar os lucros não conseguem se sustentar por muito tempo. Atendimento é tudo.",
        ],
      },
    ],
  },
  {
    nome: "Negociação",
    titulo: "Técnicas de Negociação",
    conteudo: [
      {
        subTitulo: "",
        paragrafos: [
          "Aprender técnicas de negociação é um conhecimento útil não apenas para vendedores, mas também para todo empreendedor.Aliás, é válido para qualquer profissional, mesmo que seu job description não inclua fechar negócios com stakeholders da empresa onde trabalha.Porque negociar não é apenas assinar um contrato de compra ou venda de produtos ou serviços.",
          "Negociar também é chegar a um denominador comum em uma questão específica e, por vezes, controversa.É encontrar uma maneira de resolver um conflito, fazer com que o outro aja de determinada maneira – sempre no sentido dos interesses da empresa, é claro.As técnicas de negociação, portanto, servem para qualquer um que lida com pessoas, sejam elas subordinadas ou do mesmo nível hierárquico.",
          "Mas é claro que são ainda mais importantes para aqueles que lidam diretamente com possíveis clientes e fornecedores.Em um mercado tão instável, deve-se agarrar qualquer chance de obter uma condição melhor no negócio, seja para reduzir custos ou aumentar a margem de lucro.",
          "No caso de quem está vendendo, é importante observar que as técnicas de negociação são a ponta final do trabalho para alcançar esse objetivo.Isso quer dizer que, antes de negociar, é preciso se certificar de que o serviço ou produto oferecido corresponde às expectativas do possível cliente.",
        ],
      },
    ],
  },
];

const planos = [
  {
    id: 1,
    nome: "i9Mentor",
    preco: 0.0,
    descricao:
      "- Acesso às funcionalidades de gestão de caixa\n\n- Serviço de Agendamento\n\n- Relatório mensal do fluxo de caixa (Entrada-Saída)\n\n- Visão anual de P&L do negócio\n\n- Acesso ao material de estudo\n\n- Taxa por serviço (10% limitado a R$100,00)",
  },
  {
    id: 2,
    nome: "i9Mentor Mensal",
    preco: 30.0,
    descricao:
      "- Funcionalidades do plano i9Mentor\n\n- Visa prestadores com alto número de serviços\n\n- R$30,00/mês (Aprox. R$1,00/dia)",
  },
  {
    id: 3,
    nome: "i9Mentor Mensal+",
    preco: 50.0,
    descricao:
      "- Funcionalidades do plano i9Mentor Mensal\n\n- Relatório mensal com visão diária de movimentação\n\n- Sugestões para alavancar os ganhos\n\nR$50,00/mês",
  },
  {
    id: 4,
    nome: "i9Mentor Mensal+ Equipe (EM BREVE)",
    preco: 70.0,
    descricao:
      "- Funcionalidades do plano i9Mentor Mensal+\n\n- Gestão de funcionários\n\n- Relatório gerencial (Comissões. Vendas/Funcionário)\n\n- R$70,00/mês",
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
  financeiro,
};
