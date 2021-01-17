import { FaShoppingCart } from "react-icons/fa";
import styles from "./Nav.module.css";
import { useCart } from "../../hooks/use-cart";
import Link from "next/link";

const Nav = () => {
  const { subtotal } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.navTitle}>Space Jelly Shop</a>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> ${subtotal}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
