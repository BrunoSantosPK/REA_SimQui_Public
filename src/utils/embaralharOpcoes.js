export default function embaralharOpcoes(labels, values) {

    const sortear = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const total = labels.length;
    const min = 0;
    const max = total - 1;
    const sorteados = [];

    while(sorteados.length < total) {
        let indc = sortear(min, max);

        if(sorteados.indexOf(indc) == -1) {
            // Índice não sorteado
            sorteados.push(indc);
        }
    }

    const sorteio = {
        labels: [],
        values: []
    };
    sorteados.forEach(indc => {
        sorteio.labels.push(labels[indc]);
        sorteio.values.push(values[indc]);
    });

    return sorteio;
}