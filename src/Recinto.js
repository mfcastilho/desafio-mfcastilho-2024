class Recinto {
  #numero;
  #bioma;
  #tamanhoTotal;
  #animais = [];

  constructor(numero, bioma, tamanhoTotal) {
    this.#numero = numero;
    this.#bioma = bioma;
    this.#tamanhoTotal = tamanhoTotal;
  }

  get numero() {
    return this.#numero;
  }

  get bioma() {
    return this.#bioma;
  }

  get tamanhoTotal() {
    return this.#tamanhoTotal;
  }

  get animaisExistentes() {
    return this.#animais;
  }

  calculaEspacoLivre() {
    const espacoOcupado = this.#animais.reduce(
      (acc, curr) => curr.tamanho + acc,
      0
    );

    const numeroDeEspecies = new Set(this.#animais.map(a => a.especie)).size;
    const espacoExtra = numeroDeEspecies > 1 ? 1 : 0;

    return (this.#tamanhoTotal - espacoOcupado) - espacoExtra;
  }

  adicionaAnimal(animal, quantidade) {
    const espacoNecessario = animal.tamanho * quantidade;

    if (!animal.bioma.includes(this.#bioma)) {
      return false;
    }

    if (this.calculaEspacoLivre() < espacoNecessario) {
      return false;
    }

    if (!this.ehCompativel(animal)) {
      return false;
    }

    if (
      animal.especie === 'MACACO' &&
        this.#animais.length === 0 &&
        quantidade === 1
    ) {
      return false;
    }

    for (let i = 0; i < quantidade; i++) {
      this.#animais.push(animal);
    }

    return true;
  }

  ehCompativel(animalNovo) {
    for (const animalAtual of this.#animais) {
      if (
        (animalAtual.carnivoro || animalNovo.carnivoro) &&
        animalAtual.especie !== animalNovo.especie
      ) {
        return false;
      }

      if (
        animalAtual.especie === 'HIPOPOTAMO' ||
        animalNovo.especie === 'HIPOPOTAMO'
      ) {
        if (!this.#bioma.includes('SAVANA') || !this.#bioma.includes('RIO')) {
          return false;
        }
      }
    }

    return true;
  }
}
