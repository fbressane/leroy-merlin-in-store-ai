
let currentTab = 'home';
let currentAgent = 'decor';
let chatHistories = { decor: [], build: [] };
let currentImageData = null;

function navigate(tab) {
  currentTab = tab;
  const viewHome = document.getElementById("viewHome");
  const viewChat = document.getElementById("viewChat");
  const tabHome = document.getElementById("tabHome");
  const tabDecor = document.getElementById("tabDecor");
  const tabBuild = document.getElementById("tabBuild");

  const active = "px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 bg-emerald-600 text-white shadow";
  const inactive = "px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-slate-800";

  tabHome.className = (tab === 'home') ? active : inactive;
  tabDecor.className = (tab === 'decor') ? active : inactive;
  tabBuild.className = (tab === 'build') ? active : inactive;

  if (tab === 'home') {
    viewHome.classList.remove("hidden");
    viewChat.classList.add("hidden");
  } else {
    viewHome.classList.add("hidden");
    viewChat.classList.remove("hidden");
    switchAgent(tab);
  }
}

function switchAgent(agentKey) {
  currentAgent = agentKey;
  const agent = agents[agentKey];

  document.getElementById("agentName").innerText = agent.name;
  document.getElementById("agentAvatar").innerText = agent.avatar;
  document.getElementById("agentSubtitle").innerText = agent.subtitle;

  const quickContainer = document.getElementById("quickPrompts");
  quickContainer.innerHTML = agent.quickPrompts.map(p => 
    `<button onclick="triggerQuickPrompt('${p.text.replace(/'/g, "\\'")}')" 
      class="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-gray-300 px-3 py-1.5 rounded-full shadow-sm transition font-medium">
      ${p.label}
    </button>`
  ).join("");

  if (chatHistories[agentKey].length === 0) {
    chatHistories[agentKey].push({ sender: 'bot', text: agent.welcome });
  }
  renderMessages();
}

function resetChat() {
  chatHistories[currentAgent] = [{ sender: 'bot', text: agents[currentAgent].welcome }];
  renderMessages();
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function renderProductCard(prod) {
  if (!prod) return '';
  return `
    <div class="mt-2.5 bg-emerald-50/90 border border-emerald-200 rounded-xl p-2.5 text-xs text-slate-800 shadow-sm">
      <div class="flex items-start justify-between gap-2">
        <span class="font-bold text-emerald-950 leading-snug"><i class="fa-solid fa-box-open text-emerald-600 mr-1"></i>${prod.name}</span>
        <span class="bg-emerald-700 text-white font-bold px-2 py-0.5 rounded text-[11px] whitespace-nowrap">${prod.price}</span>
      </div>
      <p class="text-[11px] text-slate-600 mt-1">${prod.specs}</p>
      <div class="mt-2 pt-1.5 border-t border-emerald-200/70 flex items-center justify-between text-[11px] font-semibold">
        <span class="text-emerald-800"><i class="fa-solid fa-location-dot mr-1 text-red-500"></i>${prod.location}</span>
        <span class="text-emerald-700"><i class="fa-solid fa-check-circle mr-1"></i>${prod.stock}</span>
      </div>
    </div>
  `;
}

function renderVisualMockup(caption) {
  return `
    <div class="mt-2.5 rounded-xl overflow-hidden border border-emerald-300 shadow-md bg-slate-900">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80" 
             alt="Simulação de Ambiente IA" class="w-full h-44 object-cover">
        <span class="absolute top-2 left-2 bg-black/75 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-emerald-400/30">
          <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Imagem Gerada pela IA In-Store
        </span>
      </div>
      <div class="p-2 bg-emerald-950 text-emerald-100 text-[11px]">
        ${caption}
      </div>
    </div>
  `;
}

function renderMessages() {
  const container = document.getElementById("chatContainer");
  const messages = chatHistories[currentAgent];
  
  container.innerHTML = messages.map(msg => {
    if (msg.sender === 'user') {
      return `
        <div class="flex justify-end">
          <div class="bg-[#d9fdd3] text-slate-800 p-3 rounded-2xl rounded-tr-none max-w-[84%] shadow-sm text-sm border border-emerald-200/60">
            ${msg.image ? `<img src="${msg.image}" class="w-full max-h-48 object-cover rounded-lg mb-2 border border-emerald-300">` : ''}
            ${msg.isAudio ? `
              <div class="flex items-center gap-2.5 bg-emerald-200/50 px-3 py-2 rounded-xl mb-1.5 border border-emerald-300/60">
                <i class="fa-solid fa-play text-emerald-800 text-xs"></i>
                <div class="flex-1 h-1.5 bg-emerald-300 rounded-full overflow-hidden">
                  <div class="w-2/3 h-full bg-emerald-700"></div>
                </div>
                <span class="text-[10px] font-mono text-emerald-900 font-semibold">0:07</span>
                <i class="fa-solid fa-microphone text-emerald-700 text-xs"></i>
              </div>
            ` : ''}
            <div class="leading-relaxed">${formatMarkdown(msg.text)}</div>
            <div class="text-[10px] text-slate-500 text-right mt-1">Agora ✓✓</div>
          </div>
        </div>`;
    } else {
      return `
        <div class="flex justify-start">
          <div class="bg-white text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm text-sm border border-gray-200">
            <div class="text-xs font-bold text-[#075E54] mb-1 flex items-center justify-between">
              <span>${agents[currentAgent].name}</span>
              <span class="text-[10px] font-normal text-gray-400">IA In-Store</span>
            </div>
            <div class="leading-relaxed">${formatMarkdown(msg.text)}</div>
            ${msg.visualMockup ? renderVisualMockup(msg.visualMockup) : ''}
            ${msg.products ? msg.products.map(p => renderProductCard(p)).join('') : ''}
          </div>
        </div>`;
    }
  }).join("");

  container.scrollTop = container.scrollHeight;
}

function generateSmartResponse(text, hasImage) {
  const q = text.toLowerCase();

  if (currentAgent === 'decor') {
    if (hasImage) {
      return {
        text: "Analisei a foto que você enviou! 📸✨\n\nPara valorizar a iluminação e trazer um visual contemporâneo sem pesar no ambiente, minha recomendação estética é combinar a textura amadeirada do **Piso Vinílico Carvalho** com uma parede de destaque em **Verde Sálvia**.\n\nVeja abaixo a simulação visual que gerei do resultado e a localização exata das peças aqui na loja:",
        visualMockup: "Simulação IA: Parede em Suvinil Verde Sálvia + Piso Vinílico Carvalho Natural + Iluminação Quente 2700K.",
        products: [catalog.vinilico, catalog.tintaSalvia]
      };
    }

    if (q.includes("imagem") || q.includes("simul") || q.includes("ficaria") || q.includes("sala")) {
      return {
        text: "Excelente escolha! A combinação de **madeira clara (Freijó/Carvalho)** com o tom **Verde Sálvia** traz uma estética *Mid-Century / Contemporânea* super acolhedora e amplia visualmente a sala.\n\nGerei uma **simulação visual** de como esses produtos do nosso estoque ficam aplicados juntos no ambiente:",
        visualMockup: "Projeção Visual: Contraste equilibrado entre o Piso Vinílico Carvalho Natural e a parede fosca Verde Sálvia.",
        products: [catalog.vinilico, catalog.tintaSalvia, catalog.pendente]
      };
    }

    if (q.includes("tinta") || q.includes("cor") || q.includes("parede") || q.includes("madeira")) {
      return {
        text: "Para harmonizar com madeira clara e piso bege sem deixar o ambiente monótono, o segredo é trabalhar com **contraste suave**:\n\n• **Opção Personalidade:** Use o *Verde Sálvia* em uma parede focal (atrás do sofá ou TV).\n• **Opção Amplitude:** Use o *Algodão Egípcio* nas demais paredes para refletir a luz natural.\n\nAmbos estão disponíveis agora no **Corredor 12**:",
        products: [catalog.tintaSalvia, catalog.tintaAlgodao]
      };
    }

    if (q.includes("ilumina") || q.includes("lâmpada") || q.includes("lampada") || q.includes("pendente") || q.includes("luz")) {
      return {
        text: "A iluminação transforma qualquer decoração! 💡 Para salas e mesas de jantar, fuja da luz branca fria (que deixa a casa com cara de escritório).\n\nAposte neste **Pendente Industrial com detalhe em madeira** instalado a 80cm acima do tampo da mesa, sempre com lâmpada **Amarela Quente (2700K)**:",
        products: [catalog.pendente]
      };
    }

    return {
      text: "Para criar um ambiente harmônico e bem resolvido com os itens que temos a pronta-entrega hoje na loja, minha sugestão de arquiteto é partir de uma **base neutra atemporal**.\n\nO Porcelanato Acetinado 90x90 reduz a quantidade de rejuntes aparentes, enquanto a tinta Algodão Egípcio aquece o espaço. Confira os corredores para ver as amostras de perto:",
      products: [catalog.porcelanato, catalog.tintaAlgodao]
    };
  } else {
    const numMatch = q.match(/(\d+)/);
    const area = numMatch ? parseInt(numMatch[1]) : 20;

    if (hasImage) {
      return {
        text: "Inspecionei a foto da peça! 🔍🛠️\n\nPara você não correr o risco de chegar em casa e a rosca não dar aperto ou vazar, a solução técnica mais segura é levar o **Sifão Universal Multiuso com bucha de redução escalonada**. Ele se adapta tanto a válvulas de 1.1/4\" (lavatório) quanto 1.1/2\" (pia americana) e encaixa em saídas de 40mm ou 50mm na parede.\n\n⚠️ **Dica de mestre de obras:** Já pegue uma Fita Veda Rosca na mesma gôndola para garantir a vedação!",
        products: [catalog.sifao, catalog.vedaRosca]
      };
    }

    if (q.includes("sifão") || q.includes("sifao") || q.includes("pia") || q.includes("ralo") || q.includes("cano") || q.includes("encaix")) {
      return {
        text: "Tradução rápida sem economês técnico: pias e lavatórios têm medidas de rosca diferentes em polegadas, e é aí que muita gente compra errado! 👷‍♂️\n\nPara ter **100% de certeza que vai encaixar**, leve o **Sifão Sanfonado Universal Tigre**. Ele já vem com um adaptador de 3 medidas de entrada e 4 medidas de saída para o esgoto da parede. Não tem erro:",
        products: [catalog.sifao, catalog.vedaRosca]
      };
    }

    if (q.includes("piso") || q.includes("porcelanato") || q.includes("argamassa") || q.includes("m²") || q.includes("m2") || q.includes("metro") || q.includes("calcul") || q.includes("caixa")) {
      const areaWithMargin = Math.ceil(area * 1.10);
      const boxes = Math.ceil(areaWithMargin / 1.62);
      const mortarBags = Math.ceil(areaWithMargin / 4);

      return {
        text: `Fiz o cálculo técnico para os seus **${area} m²** já incluindo os **10% obrigatórios de margem de segurança** para recortes de rodapé e cantos (Total: **${areaWithMargin} m²**): 📐\n\n• **Porcelanato 90x90cm:** Leve **${boxes} caixas** (cada caixa cobre 1,62 m²).\n• **Argamassa ACIII:** Leve **${mortarBags} sacos de 20kg** (considerando dupla colagem, obrigatória para peças grandes não soltarem).\n\nVeja onde retirar cada item agora na loja:`,
        products: [catalog.porcelanato, catalog.argamassa]
      };
    }

    if (q.includes("torneira") || q.includes("pressão") || q.includes("pressao") || q.includes("água") || q.includes("agua") || q.includes("m.c.a")) {
      return {
        text: "Atenção total a esse detalhe técnico! ⚠️ Na embalagem você vai ver a sigla **4 m.c.a. (metros de coluna d'água)**.\n\n• Isso significa que a caixa d'água precisa estar a pelo menos **4 metros de altura** acima da torneira.\n• Se a sua casa for térrea com caixa d'água baixa, a água vai sair fraca no misturador monocomando (a menos que você tenha pressurizador).\n\nSe tiver boa pressão ou morar em apartamento, pode levar sem medo que já vem com adaptador de 1/2\" para 3/4\":",
        products: [catalog.torneira, catalog.vedaRosca]
      };
    }

    return {
      text: "Posso validar medidas, bitolas e quantidades exatas para você não precisar voltar na loja! 🛠️\n\nAqui estão os campeões de procura técnica de hoje com estoque imediato nos corredores. Se quiser um cálculo personalizado, me diga a **metragem (m²)** ou mande uma **foto da peça**:",
      products: [catalog.sifao, catalog.argamassa]
    };
  }
}

function triggerQuickPrompt(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    currentImageData = e.target.result;
    document.getElementById("imagePreview").src = currentImageData;
    document.getElementById("imagePreviewContainer").classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  currentImageData = null;
  document.getElementById("fileInput").value = "";
  document.getElementById("imagePreviewContainer").classList.add("hidden");
}

function simulateAudioMessage() {
  const audioQuestion = currentAgent === 'decor' 
    ? "🎙️ [Áudio transcrito: 'Estou aqui no corredor de pisos, será que o piso vinílico de madeira clara combina com parede verde na minha sala?']"
    : "🎙️ [Áudio transcrito: 'Estou olhando os sifões aqui no corredor 7, qual deles eu levo pra não ter erro de encaixe na pia da cozinha?']";

  chatHistories[currentAgent].push({
    sender: 'user',
    text: audioQuestion,
    isAudio: true
  });
  renderMessages();
  processBotReply(audioQuestion, false);
}

function sendMessage() {
  const inputEl = document.getElementById("userInput");
  const userText = inputEl.value.trim();

  if (!userText && !currentImageData) return;

  const textToSend = userText || "Tirei esta foto aqui na loja. Isso serve para o meu projeto e em qual corredor encontro os complementos?";
  const attachedImage = currentImageData;

  chatHistories[currentAgent].push({
    sender: 'user',
    text: textToSend,
    image: attachedImage
  });

  inputEl.value = "";
  clearImage();
  renderMessages();

  processBotReply(textToSend, !!attachedImage);
}

function processBotReply(userText, hasImage) {
  const loadingIndex = chatHistories[currentAgent].length;
  chatHistories[currentAgent].push({
    sender: 'bot',
    text: "<span class='animate-typing text-emerald-700 font-medium'>⏳ Analisando contexto e cruzando com o estoque dos corredores...</span>"
  });
  renderMessages();

  setTimeout(() => {
    const reply = generateSmartResponse(userText, hasImage);
    chatHistories[currentAgent][loadingIndex] = {
      sender: 'bot',
      text: reply.text,
      products: reply.products,
      visualMockup: reply.visualMockup
    };
    renderMessages();
  }, 950);
}

// Inicia na aba Home
navigate('home');
