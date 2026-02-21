// Executa dentro de uma função anônima auto-invocada (IIFE) para criar contexto local seguro
(function () {
    // 🛡️ Segurança: Garante que o watcher do Vue nunca rode em sites que não sejam a plataforma de aulas.
    if (window.location.hostname !== 'aulas.descomplica.com.br') {
        return;
    }

    console.log("[Extensão] Observador de métodos Vue com Strategy Factory iniciado...");

    const strategyFactory = new StrategyFactory();

    // Função unificada para aplicar os overrides
    function aplicarOverrides(nodeElem) {
        const vm = nodeElem.__vue__;

        if (vm && vm.$vnode && vm.$vnode.componentOptions && vm.$vnode.componentOptions.tag) {
            const tag = vm.$vnode.componentOptions.tag;

            // Verifica a qual tipo de componente este nó virtual pertence e pega a classe especialista
            const strategy = strategyFactory.getStrategyByTag(tag);

            if (strategy) {
                // Se encontrar uma estratégia, executa passando a vm
                strategy.execute(vm);
            }
        }
    }

    // O MutationObserver rastreia as montagens e atualizações de estrutura na página
    const observer = new MutationObserver(() => {

        // Procura por todos os nós criados nas alternativas listadas globalmente
        const alternativasDOM = document.querySelectorAll('.question__alternative, .cloze-question');

        alternativasDOM.forEach((tagLi) => {
            let alvoAtual = tagLi;
            // Caminhamos à procura das instâncias 'pai' na estrutura DOM que possuem as características do Vue Js
            while (alvoAtual && alvoAtual !== document.body) {
                if (alvoAtual.__vue__) {
                    aplicarOverrides(alvoAtual);
                    break;
                }
                alvoAtual = alvoAtual.parentElement;
            }
        });

    });

    // Acompanhando mudanças na documentação
    observer.observe(document.body, { childList: true, subtree: true });
})();
