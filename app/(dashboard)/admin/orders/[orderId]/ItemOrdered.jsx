import Table from "@/app/_components/Table";
import Item from "./Item";

const header = [
  "Menu ID",
  "Image",
  "Product Name",
  "Size",
  "Toppings",
  "Quantity",
  "Price",
  "Total",
];

function ItemOrdered({ order }) {
  const { order_items: orderItems } = order;
  return (
    <div>
      <Table size="grid-cols-8" className="p-4">
        <h2 className="font-bold text-xl mb-3 justify-self-start">
          Items Ordered:
        </h2>
        <Table.Header>
          {header.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {orderItems.map((item) => (
          <Table.Body key={item.id} className="py-3 capitalize">
            <Item item={item} />
          </Table.Body>
        ))}

        <Table.Footer></Table.Footer>
      </Table>
    </div>
  );
}

export default ItemOrdered;
