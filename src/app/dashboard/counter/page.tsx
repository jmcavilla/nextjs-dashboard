import { CartCounter } from "@/shopping-cart/components/CartCounter";
import { useAppSelector } from "@/store";

export const metadata = {
  title: 'Shopping Cart',
  description: 'Un simple contador'
}

export default function NamePage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      
      <CartCounter value={ 20 } />
      
    </div>
  );
}