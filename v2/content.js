// Executa dentro de uma função anônima auto-invocada (IIFE) para criar contexto local seguro
(function () {
    // 🛡️ Segurança: Garante que o watcher do Vue nunca rode em sites que não sejam a plataforma de aulas.
    if (window.location.hostname !== 'aulas.descomplica.com.br') {
        return;
    }

    console.log("[Extension] Vue methods observer with Strategy Factory started...");

    const strategyFactory = new StrategyFactory();

    // Função unificada para aplicar os overrides
    function applyOverrides(nodeElem) {
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
        const alternativesDOM = document.querySelectorAll('.question__alternative, .cloze-question');

        alternativesDOM.forEach((liTag) => {
            let currentTarget = liTag;
            // Caminhamos à procura das instâncias 'pai' na estrutura DOM que possuem as características do Vue Js
            while (currentTarget && currentTarget !== document.body) {
                if (currentTarget.__vue__) {
                    applyOverrides(currentTarget);
                    break;
                }
                currentTarget = currentTarget.parentElement;
            }
        });

    });

    // Acompanhando mudanças na documentação
    observer.observe(document.body, { childList: true, subtree: true });
})();
