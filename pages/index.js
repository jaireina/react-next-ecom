import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";

export default function Home() {
  console.log(products);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SPACE JELLY STORE</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, description, image, price } = product;
            return (
              <li className={styles.card}>
                <a href="https://nextjs.org/docs" key={id}>
                  <img src={image} alt={description} />
                  <h3>{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                </a>
              </li>
            );
          })}
        </ul>
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
