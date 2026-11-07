
const catalog = {
  vinilico: {
    name: "Piso Vinílico Click Carvalho Natural (Madeira Freijó)",
    price: "R$ 89,90 / m²",
    stock: "184 m² disponíveis",
    location: "Corredor 05 • Gôndola A",
    specs: "Caixa com 2,20 m² • Instalação rápida por encaixe • Conforto térmico e acústico"
  },
  porcelanato: {
    name: "Porcelanato Marmorizado Bege Acetinado 90x90cm Portinari",
    price: "R$ 119,90 / m²",
    stock: "340 m² disponíveis",
    location: "Corredor 04 • Gôndola B",
    specs: "Caixa com 1,62 m² • Borda Retificada (junta mínima de 1,5mm)"
  },
  tintaSalvia: {
    name: "Tinta Acrílica Fosca Suvinil 'Verde Sálvia' 3,6L",
    price: "R$ 114,90 / lata",
    stock: "15 latas disponíveis",
    location: "Corredor 12 • Setor de Tintas (Balcão 2)",
    specs: "Rende até 30 m² acabados • Toque aveludado e secagem rápida"
  },
  tintaAlgodao: {
    name: "Tinta Acrílica Fosca Suvinil 'Algodão Egípcio' 18L",
    price: "R$ 389,90 / lata",
    stock: "24 latas disponíveis",
    location: "Corredor 12 • Setor de Tintas (Gôndola Central)",
    specs: "Tom neutro coringa • Rende até 150 m² acabados"
  },
  pendente: {
    name: "Pendente Industrial Preto Fosco com Detalhe em Madeira",
    price: "R$ 179,90 / un.",
    stock: "19 unidades",
    location: "Corredor 18 • Gôndola C (Iluminação)",
    specs: "Soquete E27 • Ideal usar com lâmpada LED Branco Quente (2700K)"
  },
  sifao: {
    name: "Sifão Sanfonado Universal Multiuso Branco Tigre",
    price: "R$ 24,90 / un.",
    stock: "85 unidades",
    location: "Corredor 07 • Gôndola C (Hidráulica)",
    specs: "Entrada universal (7/8\", 1.1/4\" e 1.1/2\") • Saída escalonada (38, 40, 48 e 50mm)"
  },
  vedaRosca: {
    name: "Fita Veda Rosca 18mm x 50m Tigre",
    price: "R$ 12,90 / un.",
    stock: "200 unidades",
    location: "Corredor 07 • Gôndola C (Ao lado dos sifões)",
    specs: "Indispensável para vedação de roscas hidráulicas sem vazamento"
  },
  torneira: {
    name: "Torneira Gourmet Monocomando Preta Fosca para Cozinha",
    price: "R$ 349,90 / un.",
    stock: "11 unidades",
    location: "Corredor 08 • Gôndola D (Metais Sanitários)",
    specs: "Furação 35mm • Rosca 1/2\" (acompanha adaptador 3/4\") • Pressão mín.: 4 m.c.a."
  },
  argamassa: {
    name: "Argamassa Colante ACIII Interna e Externa Quartzolit 20kg",
    price: "R$ 44,90 / saco",
    stock: "120 sacos",
    location: "Corredor 01 • Área de Construção Pesada",
    specs: "Alta aderência • Obrigatória para porcelanatos grandes e piso sobre piso"
  }
};

const agents = {
  decor: {
    name: "Inspira • Arquitetura & Decoração",
    avatar: "🎨",
    subtitle: "Especialista em estética, combinações e layout In-Store",
    welcome: "Olá! Eu sou o **Inspira**, seu arquiteto de bolso aqui na Leroy Merlin. 🏡✨\n\nTravou no meio do corredor sem saber o que combina com a sua casa? Você pode:\n• **Tirar uma foto** do seu ambiente ou produto na prateleira\n• **Mandar um áudio** rápido\n• **Gerar uma simulação visual** de como o produto vai ficar na sua sala!",
    quickPrompts: [
      { label: "🎨 Combinar tinta e madeira", text: "Quero combinar uma tinta moderna com móveis de madeira clara na minha sala. O que sugere?" },
      { label: "📸 Simular produto na minha sala", text: "Como ficaria o Piso Vinílico Carvalho e a parede Verde Sálvia na minha sala? Gere uma imagem!" },
      { label: "💡 Iluminação aconchegante", text: "Qual luminária e lâmpada levam aconchego para a mesa de jantar?" }
    ]
  },
  build: {
    name: "Resolve • Reforma & Construção",
    avatar: "🛠️",
    subtitle: "Especialista em medidas, instalação e compatibilidade técnica",
    welcome: "Fala! Aqui é o **Resolve**, seu especialista técnico de Reforma e Construção na Leroy Merlin. 👷‍♂️📏\n\nChega de sofrer com termos técnicos na embalagem ou medo de comprar a peça errada! Me mande uma **foto da peça na prateleira**, um **áudio** ou a **metragem da sua obra** que eu valido a compatibilidade e calculo tudo na hora.",
    quickPrompts: [
      { label: "🚰 Esse sifão cabe na minha pia?", text: "Estou na prateleira de hidráulica: qual sifão compro para não errar a medida da rosca da minha pia?" },
      { label: "📐 Calcular piso para 25 m²", text: "Preciso revestir uma área de 25 m² com porcelanato. Quantas caixas e quanta argamassa eu levo?" },
      { label: "🔧 Dúvida de pressão de torneira", text: "Essa torneira gourmet monocomando funciona em casa térrea com pouca pressão de água?" }
    ]
  }
};
