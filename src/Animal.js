class Animal {
  #especie;
  #tamanho;
  #bioma;
  #ehCarnivoro;

  constructor(especie, tamanho, bioma) {
    this.#especie = especie;
    this.#tamanho = tamanho;
    this.#bioma = bioma;
    this.#ehCarnivoro = this.verificaSeEhCarnivoro(especie);
  }

  get especie() {
    return this.#especie;
  }

  get tamanho() {
    return this.#tamanho;
  }

  get bioma() {
    return this.#bioma;
  }

  get ehCarnivoro() {
    return this.#ehCarnivoro;
  }

  verificaSeEhCarnivoro(especie) {
    if (
      especie === 'LEAO' ||
      especie === 'LEOPARDO'
      || especie === 'CROCODILO'
    ) {
      return true;
    }

    return false;
  }
}