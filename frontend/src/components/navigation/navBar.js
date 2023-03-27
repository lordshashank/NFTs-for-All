import WalletConnect from "./WalletConnect";
import classes from "../../styles/NavBar.module.css";
import Link from "next/link";
import useWeb3 from "../hooks/useWeb3";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/../public/logo.jpeg";

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
        <Image
          src={logo}
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
          alt=""
        />
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
      <div className={classes["profile-wallet"]}>
        <Link
          href={"/profile"}
          style={{ all: "unset", padding: "0", margin: "0", cursor: "pointer" }}
        >
          <Image
            loader={() =>
              "https://shreethemes.in/giglink/layouts/assets/images/avatar/1.jpg"
            }
            src="https://shreethemes.in/giglink/layouts/assets/images/avatar/1.jpg"
            width={50}
            alt=""
            height={50}
            style={{ borderRadius: "100px" }}
          />
        </Link>
        <WalletConnect />
      </div>
    </header>
  );
};

export default NavBar;
