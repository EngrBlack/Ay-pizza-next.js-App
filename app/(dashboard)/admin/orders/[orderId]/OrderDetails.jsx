"use client";

import Flexitem from "@/app/_components/Flexitem";
import Table from "@/app/_components/Table";
import { formatCurrency } from "@/app/_helper/helper";
import Image from "next/image";

const now = new Date();
const date = now.toDateString();

const header = ["Product ID", "Product Name", "Quantity", "Price", "Total"];

function OrderDetails({ orderId }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col  gap-6 lg:flex-row">
        <OrderInfo orderId={orderId} />
        <CustomerInfo />
      </div>
      <ItemOrdered />
      <PaymentSummary />
    </div>
  );
}

export default OrderDetails;

function OrderInfo({ orderId }) {
  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Order Info:</h2>
      <Flexitem label="Order Date:">{date}</Flexitem>
      <Flexitem label="Delivery Date:">20 December 2025</Flexitem>
      <Flexitem label="Order ID:">{orderId}</Flexitem>
      <Flexitem label="Status:">Progress</Flexitem>
      <Flexitem label="Payment Status">Paid</Flexitem>
    </div>
  );
}

function CustomerInfo() {
  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Customer Info:</h2>
      <Flexitem label="Name:">Gabriel Uchenna</Flexitem>
      <Flexitem label="Email:">gabrieluchenna@gmail.com</Flexitem>
      <Flexitem label="contact:">081 1921 1278</Flexitem>
      <Flexitem label=" Address:">
        <div className=" bg-brown text-cream-100 w-fit rounded-lg  py-2 px-4 text-lg">
          Block 569 flat 6, Abesan Estate Ipaja, L.G.A Alimosho, Lagos state.
        </div>
      </Flexitem>
    </div>
  );
}

function ItemOrdered() {
  return (
    <div>
      <Table size="grid-cols-5" className="p-4">
        <h2 className="font-bold text-xl mb-3">Items Ordered:</h2>
        <Table.Header>
          {header.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {Array.from({ length: 5 }, (_, i) => (
          <Table.Body key={i} className="py-3 ">
            <Item />
          </Table.Body>
        ))}

        <Table.Footer></Table.Footer>
      </Table>
    </div>
  );
}

function Item() {
  return (
    <>
      <div>...j23dk3</div>
      <div className="flex items-center gap-2">
        <figure className="w-12 aspect-square rounded-md overflow-hidden">
          <Image
            width={50}
            height={50}
            src="/pizza-1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </figure>
        <span>Chicken Veggie Pizza</span>
      </div>
      <div>12</div>
      <div>{formatCurrency(32000)}</div>
      <div>{formatCurrency(140000)}</div>
    </>
  );
}

function PaymentSummary() {
  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4">
      <div className="  flex flex-col gap-2 md:gap-4 border p-6 border-brown-100">
        <h2 className="font-bold text-xl">Payment Summary:</h2>
        <Flexitem label="Subtotal(2 items):">{formatCurrency(49000)}</Flexitem>
        <Flexitem label="Delivery Fee:">{formatCurrency(1000)}</Flexitem>
        <Flexitem label="Tax 10% (Included):">{formatCurrency(200)}</Flexitem>
        <div className="flex items-center justify-between font-bold text-sm sm:text-base md:text-xl border-t-1 border-brown-300 pt-2">
          <p>Total to be paid by Customer:</p>
          <p>{formatCurrency(50200)}</p>
        </div>
      </div>
    </div>
  );
}
