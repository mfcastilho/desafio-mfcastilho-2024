import Recinto from './classes/Recinto.js';
import Animal from './classes/Animal.js';

class RecintosZoo {
  #recintos = [
    new Recinto(1, ['SAVANA'], 10, [
      new Animal('MACACO', 1, ['SAVANA', 'FLORESTA']),
      new Animal('MACACO', 1, ['SAVANA', 'FLORESTA']),
      new Animal('MACACO', 1, ['SAVANA', 'FLORESTA']),
    ]),
    new Recinto(2, ['FLORESTA'], 5, []),
    new Recinto(3, ['SAVANA', 'RIO'], 7, [new Animal('GAZELA', 2, ['SAVANA'])]),
    new Recinto(4, ['RIO'], 8, []),
    new Recinto(5, ['SAVANA'], 9, [new Animal('LEAO', 3, ['SAVANA'])]),
  ];

  #animais = [
    new Animal('LEAO', 3, ['SAVANA']),
    new Animal('LEOPARDO', 2, ['SAVANA']),
    new Animal('CROCODILO', 3, ['RIO']),
    new Animal('MACACO', 1, ['SAVANA', 'FLORESTA']),
    new Animal('GAZELA', 2, ['SAVANA']),
    new Animal('HIPOPOTAMO', 4, ['SAVANA', 'RIO']),
  ];

  analisaRecintos(animal, quantidade) {
    if (!this.#animalValido(animal)) {
      return {
        erro: 'Animal inválido',
      };
    }

    if (!this.#quantidadeValida(quantidade)) {
      return {
        erro: 'Quantidade inválida',
      };
    }

    const animalObj = this.#animais.find((a) => a.especie === animal);
    const recintosViaveis = [];

    console.log(this.#recintos);
    
    for (const recinto of this.#recintos) {
      const recintoViavel = recinto.recintoViavel(animalObj, quantidade);
      
      if (recintoViavel) {
        recintosViaveis.push(recinto);
      }
    }

    if (recintosViaveis.length === 0) {
      return {
        erro: 'Não há recinto viável',
      };
    }

    return {
      recintosViaveis: recintosViaveis.map(
        (recinto) =>
          `Recinto ${
            recinto.numero
          } (espaço livre: ${recinto.espacoLivre} total: ${
            recinto.tamanhoTotal
          })`
      ),
    };
  }

  #quantidadeValida(quantidade) {
    return typeof quantidade === 'number' && quantidade > 0;
  }

  #animalValido(animal) {
    return this.#animais.some((a) => a.especie === animal);
  }
}

let resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
console.log(resultado.recintosViaveis);

export { RecintosZoo as RecintosZoo };
