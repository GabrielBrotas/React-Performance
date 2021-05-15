export interface AddProductToWishListProps {
  onRequestClose: () => void;
  onAddToWishList: () => void;
}

export const AddProductToWishList = ({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishListProps) => {
  return (
    <div style={{ display: "flex" }}>
      <p>deseja adicionar aos favoritos?</p>
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </div>
  );
};
