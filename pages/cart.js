import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";
import products from "../shared/products.json";
import Table from "../components/Table";

import { useCart } from "../hooks/use-cart";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerItem",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Cart() {
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      const handleOnSubmit = (e) => {
        e.preventDefault();
        const { currentTarget: form } = e;
        const quantity = form.elements.quantity?.value;
        updateItem({ id: item.id, quantity: quantity && parseInt(quantity) });
      };

      return (
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
            required
          />
          <button>Update</button>
        </form>
      );
    };

    return {
      ...item,
      title: product.title,
      total: `$${item.quantity * item.pricePerItem}`,
      pricePerItem: `$${item.pricePerItem}`,
      quantity: <Quantity />,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
