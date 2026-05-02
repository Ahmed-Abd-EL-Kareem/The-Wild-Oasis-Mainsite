import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import HeaderClient from "@/app/_components/HeaderClient";

export default function Header() {
  return <HeaderClient logo={<Logo />} navigation={<Navigation />} />;
}
