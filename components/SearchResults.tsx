import React, { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{ id: number; price: number; title: string }>;
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  // o useMemo evita que alguma coisa que ocupe muito processamento ex: calculo, condicoes, etc,  seja refeito toda hora
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]); // se os results nao mudar o total price nao vai ser calculado novamente

  return (
    <ul>
      <h2>{totalPrice}</h2>
      {results.map((result) => (
        <ProductItem product={result} />
      ))}
    </ul>
  );
};

/*
Quando utilizar o useMemo
1. Calculos pesados
2. Igualdade Referencial (repassa a informação a um componente filho)
*/