import { FaShoppingCart } from "react-icons/fa";
import styles from "./Nav.module.css";
import { useCart } from "../../hooks/use-cart";
import Link from "next/link";

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <p className={styles.navTitle}>Space Jelly Shop</p>
      </Link>
      <p className={styles.navCart}>
        <button onClick={checkout}>
          <FaShoppingCart /> ${subtotal}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
