import { OrderItem } from "./orderItem";

export class Order {
  id: number = 0;
  supplierId: number | null = 1;
  currency: string | null = null;
  items: OrderItem[] | null = null;
}
