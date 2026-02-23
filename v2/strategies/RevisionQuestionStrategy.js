class RevisionQuestionStrategy {
    type() {
        return StrategyType.REVISION_REQUESTION;
    }

    execute(vm) {
        if (typeof vm.getAlternativeClass !== 'function' || vm.__isOverridden) return;

        console.log("[Extension] 'REVISION LIST' strategy activated! Overriding...");

        vm.getAlternativeClass = function (e) {
            // --- LÓGICA CUSTOMIZADA AQUI ---
            if (e && e.correct) {
                return "question__alternative--correct-animated";
            }

            // --- MANTER COMPORTAMENTO ORIGINAL ---
            const eId = (e && e.id) ? e.id : e;

            if (!this.answered && this.isUserAnswer(eId)) {
                return "question__alternative--selected";
            }

            if (this.answered) {
                if (e && !e.correct && this.isUserAnswer(eId)) {
                    return "question__alternative--incorrect";
                }
                if (e && e.correct) {
                    return "question__alternative--correct";
                }
                return "question__alternative--disabled";
            }

            return "question__alternative--active";
        };

        vm.__isOverridden = true;
        if (vm.$forceUpdate) vm.$forceUpdate();
    }
}
