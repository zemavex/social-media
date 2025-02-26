import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";
import cls from "./AuthenticatedLayout.module.scss";

export const AuthenticatedLayout = () => {
  return (
    <div className={cls.layout}>
      <Sidebar />
      <div className={cls.outlet__wrap}>
        <Outlet />
      </div>
    </div>
  );
};
