import { FormEvent, useState } from "react";
import { SearchResults } from "../components/SearchResults";

/*
Renderização
1. Cria uma nova versão do componente
2. compara com a versão anterior
3. se houverem alterações vai atualizar apenas o que foi alterado
*/


export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  async function searchProducts(e: FormEvent) {
    e.preventDefault();

    if (!searchValue.trim) return;

    const response = await fetch(
      `http://localhost:3333/products?q=${searchValue}`
    );
    const data = await response.json();
    setResults(data);
  }

  // toda vez que o componente for recriado as funcoes dentro dele vao ser recriadas novamente por causa da igualdade referencial
  // 
  async function addToWishList(id: number) {
    console.log(id)
  }

  return (
    <div>
      <h1>search</h1>

      <form onSubmit={searchProducts}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit">search</button>
      </form>

      <SearchResults results={results} />
    </div>
  );
}
