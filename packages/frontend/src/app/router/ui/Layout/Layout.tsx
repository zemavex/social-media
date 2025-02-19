import { Outlet } from "react-router";
import { Header } from "@/widgets/header";
import cls from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={cls.layout}>
      <Header />
      <main className={`container ${cls.main}`}>
        <Outlet />
      </main>
    </div>
  );
};
