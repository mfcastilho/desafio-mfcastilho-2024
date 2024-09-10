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
    //Regra1: Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
    if (!this.#validaBioma(animal)) {
      return false;
    }

    if (!this.#ehCompativel(animal, quantidade)) {
      return false;
    }

    const espacoLivre = this.#calculaEspacoLivre(animal, quantidade);

    //Regra3: Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
    if (espacoLivre < 0) {
      return false;
    }

    this.#espacoLivre = espacoLivre;

    return true;
  }

  #calculaEspacoLivre(animal, quantidade) {
    const animaisCopy = this.#animais;

    for (let i = 0; i < quantidade; i++) {
      animaisCopy.push(animal);
    }

    const espacoOcupado = this.#calculaEspacoOcupado(animaisCopy);

    const numeroDeEspecies = new Set(animaisCopy.map((a) => a.especie)).size;

    //Reagra6: Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
    const espacoExtra = numeroDeEspecies > 1 ? 1 : 0;

    const espacoLivre = this.#tamanhoTotal - espacoOcupado - espacoExtra;

    return espacoLivre;
  }

  #ehCompativel(animalNovo, quantidade) {
    for (const animalAtual of this.#animais) {
      //regra2: Animais carnívoros devem habitar somente com a própria espécie
      if (!this.#validaCarnivoros(animalAtual, animalNovo)) {
        return false;
      }
    }

    //regra4: Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
    if (!this.#validaHipopotamo(this.#animais, animalNovo)) {
      return false;
    }

    //Reagra5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
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
    //regra2: Animais carnívoros devem habitar somente com a própria espécie
    if (
      (animalAtual.ehCarnivoro || animalNovo.ehCarnivoro) &&
      animalAtual.especie !== animalNovo.especie
    ) {
      return false;
    }

    return true;
  }

  #validaHipopotamo(animais, animalNovo) {
    // Verifica se há algum hipopótamo no recinto atual ou se o novo animal é um hipopótamo
    const temHipopotamo =
      animais.some((a) => a.especie === 'HIPOPOTAMO') ||
      animalNovo.especie === 'HIPOPOTAMO';

    // Se há hipopótamos no recinto
    if (temHipopotamo) {
      // Verifica se o recinto possui ambos os biomas: "SAVANA" e "RIO"
      const temSavana = this.#bioma.includes('SAVANA');
      const temRio = this.#bioma.includes('RIO');

      // Contabiliza o total de animais no recinto, incluindo o novo animal se for um hipopótamo
      const totalAnimais =
        animais.length + (animalNovo.especie === 'HIPOPOTAMO' ? 1 : 0);

      if (totalAnimais > 1) {
        // Se há mais de um animal, o recinto deve ter ambos os biomas
        return temSavana && temRio;
      } else {
        // Se o hipopótamo está sozinho, o recinto pode ter apenas um dos biomas
        return temSavana || temRio;
      }
    }

    // Se não há hipopótamos, a validação para outros animais não é necessária
    return true;
  }

  #validaMacaco(animais, animalNovo, quantidade) {
    //Reagra5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
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
