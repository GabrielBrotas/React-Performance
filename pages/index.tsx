import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";
import * as l from "lodash";

/*
Renderização
1. Cria uma nova versão do componente
2. compara com a versão anterior
3. se houverem alterações vai atualizar apenas o que foi alterado
*/

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<{ totalPrice: number; data: [] }>({
    totalPrice: 0,
    data: [],
  });

  async function searchProducts(e: FormEvent) {
    e.preventDefault();

    if (!searchValue.trim) return;

    const response = await fetch(
      `http://localhost:3333/products?q=${searchValue}`
    );
    const data = await response.json();

    const formatedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatedPrice.format(product.price), // esta sendo formatado apenas uma vez ao vez de ser formatado no momento em que vai ser mostrado os dados, vai evitar criar muitos useMemos
    }));

    // o melhor momento para a formatacao dos dados é depois da chamada pois assim ja entregamos os dados formatados e nao precisamos nos preocupar com performace do calculo dentro do componente
    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  // toda vez que o componente home for atualizado todas as funcoes dentro dele vao ser recriadas novamente por causa da igualdade referencial ocupando um novo espaco na memoria e como esse addToWishList é passado de props em props o SearchResults vai perceber que a funcao foi recriada novamente e perceber que é diferente a anterior por causa da igualdade referencial e vai recriar o componente do zero
  // se a funcao esta sendo repassada em props devemos utilizar o useCallback
  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <>
      <h1>search</h1>

      <form onSubmit={searchProducts}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit">search</button>
      </form>

      <SearchResults results={results} onAddToWishList={addToWishList} />
    </>
  );
}
