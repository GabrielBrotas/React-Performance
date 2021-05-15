import React, { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    totalPrice: number;
    data: Array<{
      id: number;
      price: number;
      title: string;
      priceFormatted: string;
    }>;
  };
  onAddToWishList: (id: number) => void;
}

export const SearchResults = ({
  results,
  onAddToWishList,
}: SearchResultsProps) => {
  // o useMemo evita que alguma coisa que ocupe muito processamento ex: calculo, condicoes, etc,  seja refeito toda hora
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0);
  // }, [results]); // se os results nao mudar o total price nao vai ser calculado novamente

  return (
    <ul>
      <h2>{results.totalPrice}</h2>
      {results.data.map((product) => (
        <ProductItem
          key={product.id} // O map precisa de uma key pois para o react saber o que foi adicionado ou deletado é dificil, entao para saber de forma mais precisa ele compara pelo identificador unico, se ele mudou da posicao ex: da 1 para a 10 o react vai saber que ele nao alterou pelo identificador mas se passarmos o indice ele vai sempre ser alterado, por isso nao é viavel passar o indice
          // ex: se em uma lista temos o id: 1, 2, 3, 4, 5, 6. e o produto 1 for para a posicao 4 ele vai continuar com o mesmo id entao nao vai precisar ser recalculado novamente, mas se fosse o indice(posicao) seria tudo recalculado novamente
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </ul>
  );
};

/*
Quando utilizar o useMemo
1. Calculos pesados
2. Igualdade Referencial (repassa a informação a um componente filho)
*/
