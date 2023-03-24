import WalletConnect from "../WalletConnect";
import classes from "../../styles/NavBar.module.css";
import Link from "next/link";
import useWeb3 from "../useWeb3";
const NavBar = () => {
  const { userAccount } = useWeb3();
  console.log(userAccount);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>Logo</h1>
      </div>
      <nav className={classes["nav-links"]}>
        <Link className={classes.link} href="/">
          Home
        </Link>
        <Link className={classes.link} href="/fractional">
          Fractional
        </Link>
        <Link className={classes.link} href="/nfts">
          Nfts
        </Link>
        <Link className={classes.link} href="/pass">
          Pass
        </Link>
        {userAccount && (
          <Link className={classes.link} href="/create">
            Create
          </Link>
        )}
      </nav>

      <div className={classes.wallet}>
        <WalletConnect />
      </div>
    </header>
  );
};

export default NavBar;
