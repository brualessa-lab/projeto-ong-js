/* =========================================================
   navegacao.js — roteador da SPA.
   Lê o endereço depois do # e decide qual tela desenhar,
   sem o navegador recarregar a página.
   ========================================================= */

import { Templates } from "./templates.js";

export const Navegacao = {

  /* cada rota aponta para a função de template que a desenha */
  rotas: {
    "inicio": Templates.telaInicio,
    "projetos": Templates.telaProjetos,
    "cadastro": Templates.telaCadastro
  },

  rotaPadrao: "inicio",

  /* devolve { nome, ancora } a partir de algo como #/projetos/prato-cheio */
  lerEndereco() {
    const bruto = window.location.hash.replace("#/", "").trim();
    if (bruto === "") {
      return { nome: Navegacao.rotaPadrao, ancora: null };
    }
    const partes = bruto.split("/");
    return { nome: partes[0], ancora: partes[1] || null };
  },

  /* desenha a tela correspondente dentro do contêiner da aplicação */
  desenhar() {
    const destino = Navegacao.lerEndereco();
    const montarTela = Navegacao.rotas[destino.nome] || Templates.telaNaoEncontrada;

    const app = document.getElementById("app");
    app.innerHTML = montarTela();

    Navegacao.marcarItemAtivo(destino.nome);
    Navegacao.fecharMenuMobile();
    Navegacao.posicionar(destino.ancora);
  },

  /* marca no menu qual é a tela atual */
  marcarItemAtivo(nome) {
    document.querySelectorAll("nav a[data-rota]").forEach(link => {
      if (link.dataset.rota === nome) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },

  /* rola até o projeto escolhido no submenu, ou volta ao topo */
  posicionar(ancora) {
    if (ancora) {
      const alvo = document.getElementById(ancora);
      if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  },

  /* no celular o menu fica aberto pelo checkbox: fecha ao trocar de tela */
  fecharMenuMobile() {
    const alternador = document.getElementById("abrir-menu");
    if (alternador) {
      alternador.checked = false;
    }
  },

  iniciar() {
    window.addEventListener("hashchange", Navegacao.desenhar);

    /* endereço vazio cai na rota padrão */
    if (window.location.hash === "") {
      window.location.hash = "#/" + Navegacao.rotaPadrao;
    } else {
      Navegacao.desenhar();
    }
  }

};
