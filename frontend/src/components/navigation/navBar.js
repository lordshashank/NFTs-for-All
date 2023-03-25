import WalletConnect from "../WalletConnect";
import classes from "../../styles/NavBar.module.css";
import Link from "next/link";
import useWeb3 from "../useWeb3";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";
const NavBar = () => {
  const router = useRouter();
  const [showLinks, setShowLinks] = useState(false);
  const { userAccount } = useWeb3();
  const isActive = (path) => {
    if (router.pathname === path) return { color: "#7c3aed" };
  };
  const isActiveCreateLink = () => {
    if (
      isActive("/create-nft") !== undefined ||
      isActive("/create-subscriptional") !== undefined
    )
      return { color: "#fff" };
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>Logo</h1>
      </div>
      <nav className={classes["nav-links"]}>
        <Link style={isActive("/")} className={classes.link} href="/">
          Home
        </Link>

        <Link style={isActive("/nfts")} className={classes.link} href="/nfts">
          Nfts
        </Link>
        <Link
          style={isActive("/fractional")}
          className={classes.link}
          href="/fractional"
        >
          Fractional
        </Link>
        <Link style={isActive("/pass")} className={classes.link} href="/pass">
          Subscriptional Nft
        </Link>
        {userAccount && (
          <div
            onMouseLeave={() => setShowLinks(false)}
            className={classes["create-links"]}
          >
            <div
              style={isActiveCreateLink()}
              onMouseEnter={() => setShowLinks(true)}
              className={classes["hover-me"]}
            >
              Create <AiOutlineDown />
            </div>
            {showLinks && (
              <ul>
                <li>
                  <Link style={isActive("/create-nft")} href="/create-nft">
                    Nft
                  </Link>
                </li>
                <li>
                  <Link
                    style={isActive("/create-subscriptional")}
                    href="/create-subscriptional"
                  >
                    Subscriptional Nft
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>

      <div className={classes.wallet}>
        <WalletConnect />
      </div>
    </header>
  );
};

export default NavBar;
