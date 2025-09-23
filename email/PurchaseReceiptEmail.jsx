import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { formatCurrency, formatDate } from "../app/_helper/helper";
import { nanoid } from "nanoid";

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: nanoid(10),
    user: {
      name: "Gabriel Peace",
      email: "test@test.com",
    },
    createdAt: new Date(),
    totalPrice: 20000,
    taxPrice: 0,
    deliveryPrice: 1500,
    itemsPrice: 18500,
    orderItems: [
      {
        id: nanoid(6),
        name: "Pizza Margherita",
        quantity: 2,
        image: "/pizza.jpg",
        price: 9250,
      },
    ],
  },
};

function PurchaseReceiptEmail({ order }) {
  return (
    <Html>
      <Head />
      <Preview>Your purchase receipt from AY-PIZZA</Preview>
      <Body
        style={{
          backgroundColor: "#f9f9f9",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: "20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e5e5",
          }}
        >
          {/* Header */}
          <Heading
            style={{
              fontSize: "20px",
              marginBottom: "16px",
              textAlign: "center",
              color: "#111111",
            }}
          >
            Purchase Receipt
          </Heading>

          {/* Order Info */}
          <Section style={{ marginBottom: "20px" }}>
            <Row>
              <Column>
                <Text style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                  Order ID
                </Text>
                <Text style={{ fontSize: "14px", margin: "4px 0" }}>
                  {order.id}
                </Text>
              </Column>
              <Column>
                <Text style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                  Purchase Date
                </Text>
                <Text style={{ fontSize: "14px", margin: "4px 0" }}>
                  {formatDate(order.createdAt)}
                </Text>
              </Column>
              <Column>
                <Text style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                  Price Paid
                </Text>
                <Text style={{ fontSize: "14px", margin: "4px 0" }}>
                  {formatCurrency(order.totalPrice)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Items */}
          <Section
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            {order.orderItems.map((item) => (
              <Row key={item.id} style={{ marginBottom: "12px" }}>
                <Column style={{ width: "80px" }}>
                  <Img
                    width="70"
                    src={
                      item.image.startsWith("/")
                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                        : item.image
                    }
                    alt={item.name}
                    style={{
                      borderRadius: "4px",
                      border: "1px solid #eee",
                      display: "block",
                    }}
                  />
                </Column>
                <Column>
                  <Text style={{ margin: "0 0 4px 0", fontSize: "14px" }}>
                    {item.name} × {item.quantity}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={{ margin: 0, fontSize: "14px" }}>
                    {formatCurrency(item.price)}
                  </Text>
                </Column>
              </Row>
            ))}

            {/* Totals */}
            {[
              { name: "Items", price: order.itemsPrice },
              { name: "Tax", price: order.taxPrice },
              { name: "Delivery Fee", price: order.deliveryPrice },
              { name: "Total", price: order.totalPrice },
            ].map(({ name, price }) => (
              <Row key={name} style={{ padding: "4px 0" }}>
                <Column align="right">
                  <Text style={{ margin: 0, fontSize: "14px" }}>{name}:</Text>
                </Column>
                <Column align="right" style={{ width: "80px" }}>
                  <Text style={{ margin: 0, fontSize: "14px" }}>
                    {formatCurrency(price)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Footer */}
          <Text
            style={{
              fontSize: "12px",
              color: "#888",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Thank you for your order!
            <br />
            AY-PIZZA Team 🍕
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default PurchaseReceiptEmail;
