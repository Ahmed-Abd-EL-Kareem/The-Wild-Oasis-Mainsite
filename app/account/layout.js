import SideNavigation from "@/app/_components/SideNavigation";

export default function layout({ children }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[16rem_1fr] min-h-screen gap-6 lg:gap-12">
      <div className="flex-1 lg:order-2">
        <div className="py-1 pb-20 lg:pb-1">{children}</div>
      </div>
      <div className="order-2 lg:order-1 lg:mt-0 mt-auto">
        <SideNavigation />
      </div>
    </div>
  );
}
