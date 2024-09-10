class Recinto {
  #numero;
  #bioma;
  #tamanhoTotal;
  #espacoLivre;
  #animais = [];

  constructor(numero, bioma, tamanhoTotal, animais = []) {
    this.#numero = numero;
    this.#bioma = bioma;
    this.#tamanhoTotal = tamanhoTotal;
    this.#animais = animais;
    this.#espacoLivre =
      this.tamanhoTotal - this.#calculaEspacoOcupado(this.#animais);
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

  get espacoLivre() {
    return this.#espacoLivre;
  }

  get animais() {
    return this.#animais;
  }

  recintoViavel(animal, quantidade) {
    if (!this.#validaBioma(animal)) {
      return false;
    }

    if (!this.#ehCompativel(animal, quantidade)) {
      return false;
    }

    const espacoLivre = this.#calculaEspacoLivre(animal, quantidade);

    if (espacoLivre < 0) {
      return false;
    }

    this.#espacoLivre = espacoLivre;

    return true;
  }

  #calculaEspacoLivre(animal, quantidade) {
    const animaisCopy = [...this.#animais];

    for (let i = 0; i < quantidade; i++) {
      animaisCopy.push(animal);
    }

    const espacoOcupado = this.#calculaEspacoOcupado(animaisCopy);

    const numeroDeEspecies = new Set(animaisCopy.map((a) => a.especie)).size;

    const espacoExtra = numeroDeEspecies > 1 ? 1 : 0;

    const espacoLivre = this.#tamanhoTotal - espacoOcupado - espacoExtra;

    return espacoLivre;
  }

  #ehCompativel(animalNovo, quantidade) {
    for (const animalAtual of this.#animais) {
      if (!this.#validaCarnivoros(animalAtual, animalNovo)) {
        return false;
      }
    }

    if (!this.#validaHipopotamo(this.#animais, animalNovo)) {
      return false;
    }

    if (!this.#validaMacaco(this.#animais, animalNovo, quantidade)) {
      return false;
    }

    return true;
  }

  #validaBioma(animal) {
    return this.#bioma.some((biomaRecinto) =>
      animal.bioma.includes(biomaRecinto)
    );
  }

  #calculaEspacoOcupado(animais) {
    return animais.reduce((acc, curr) => acc + curr.tamanho, 0);
  }

  #validaCarnivoros(animalAtual, animalNovo) {
    if (
      (animalAtual.ehCarnivoro || animalNovo.ehCarnivoro) &&
      animalAtual.especie !== animalNovo.especie
    ) {
      return false;
    }

    return true;
  }

  #validaHipopotamo(animais, animalNovo) {
    const temHipopotamo =
      animais.some((a) => a.especie === 'HIPOPOTAMO') ||
      animalNovo.especie === 'HIPOPOTAMO';

    if (temHipopotamo) {
      const temSavana = this.#bioma.includes('SAVANA');
      const temRio = this.#bioma.includes('RIO');

      const totalAnimais =
        animais.length + (animalNovo.especie === 'HIPOPOTAMO' ? 1 : 0);

      if (totalAnimais > 1) {
        return temSavana && temRio;
      } else {
        return temSavana || temRio;
      }
    }

    return true;
  }

  #validaMacaco(animais, animalNovo, quantidade) {
    if (
      animalNovo.especie === 'MACACO' &&
      animais.length === 0 &&
      quantidade === 1
    ) {
      return false;
    }

    return true;
  }
}

export default Recinto;
