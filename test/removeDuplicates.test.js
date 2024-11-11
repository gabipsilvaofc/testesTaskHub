const { removeDuplicates } = require('../controllers/projectsControl');

describe('testando a funçãoremoveDuplicates', () => {
  it('deve remover itens duplicados com base no _id', () => {
    const array = [
      { _id: 1, name: 'Projeto A' },
      { _id: 2, name: 'Projeto B' },
      { _id: 1, name: 'Projeto A' },
      { _id: 3, name: 'Projeto C' },
      { _id: 2, name: 'Projeto B' },
    ];

    const result = removeDuplicates(array);

    expect(result.length).toBe(3);
    expect(result).toEqual([
      { _id: 1, name: 'Projeto A' },
      { _id: 2, name: 'Projeto B' },
      { _id: 3, name: 'Projeto C' },
    ]);
  });

  it('deve retornar um array vazio se o array original for vazio', () => {
    const array = [];
    const result = removeDuplicates(array);
    expect(result).toEqual([]);
  });

  it('deve retornar o mesmo array se não houver duplicatas', () => {
    const array = [
      { _id: 1, name: 'Projeto A' },
      { _id: 2, name: 'Projeto B' },
      { _id: 3, name: 'Projeto C' },
    ];
    const result = removeDuplicates(array);
    expect(result).toEqual(array);
  });

  it('deve tratar objetos com _id de diferentes tipos corretamente', () => {
    const array = [
      { _id: '1', name: 'Projeto A' },
      { _id: 1, name: 'Projeto A' },
    ];

    const result = removeDuplicates(array);
    
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Projeto A');
  });
});
