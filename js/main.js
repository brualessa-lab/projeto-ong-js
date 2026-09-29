/* =========================================================
   main.js — ponto de entrada da aplicação.
   Liga os módulos quando o documento termina de carregar.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  Navegacao.iniciar();
  Modal.iniciar();
  Formulario.iniciar();
  Mascaras.iniciar();
});
