import { memo } from "react";

interface SearchResultsProps {
  product: { id: number; price: number; title: string };
}

const ProductItemBase = ({ product }: SearchResultsProps) => {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
};

/* 
o memo evita que o react crie uma nova versao do componente (sempre que o pai sofre alguma alteracao) caso nenhuma propriedade do componente tenha sido alterado
 basicamente o memo vai verificar se alguma coisa da variavel 'product' mudou em relacao a anterior, caso nao tenha mudado nao vai criar outra versao do componente pois temos certeza que nao vamos precisar alterar nada pois tudo vem das propriedades
 o memo faz uma shallow compare = comparação rasa

 igualdade referencial {} === {} = false
 pois o js nao compara o conteudo e sim se está ocupando a mesma posição da memoria ,
 o obj q eu tinha antes é o mesmo q eu tinha agora?
*/

export const ProductItem = memo(ProductItemBase, (prevProps, nextProps) => {
  // funcao que diz se o componente deve ser renderizado ou nao
  // prev props = propriedades anteriores
  // nextProps = novas propriedades
  return Object.is(prevProps.product, nextProps.product); // verifica se é igual, nao de forma referencial mas de uma forma geral, conteudo, etc, custa mais de processamento na memoria entao não é recomendado utilizar em dados complexos
});

/*
toda funcionalidade do react tem um custo na memoria então nao deve ser usada em qualquer lugar,
o memo tem o custo de comparaçao, nesse caso temos mais de 1000 produtos para ser renderizadoes entao é melhor usar o memo
? Situaçoes para se usar o memo
    1. Pure Functional Components -> 
        componentes que são apenas para guardar um pedaço do codigo da aplicação, abstrair alguma parte visual por exemplo, pois sempre vao retornar o mesmo resultado, informaçeos que vem de dentro do componente nao precisam do memo so os que tem interferencia externa
    2. Renders too often - mas se um componente é renderizado varias vezes só que com informaçoes diferentes nao tem muito o que ser feit 
    3. Re-renders with same props
    4. Medium to big size

*/
