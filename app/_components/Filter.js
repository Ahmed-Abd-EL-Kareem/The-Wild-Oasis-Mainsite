"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handelFilter(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex flex-wrap">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        <span className="hidden sm:inline">1 &mdash; 3 guests</span>
        <span className="sm:hidden">1-3</span>
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        <span className="hidden sm:inline">4 &mdash; 7 guests</span>
        <span className="sm:hidden">4-7</span>
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        <span className="hidden sm:inline">8 &mdash; 12 guests</span>
        <span className="sm:hidden">8-12</span>
      </Button>
    </div>
  );
}
function Button({ filter, handelFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handelFilter(filter)}
      className={`duration-200 py-2 sm:py-3 px-3 sm:px-5 text-sm sm:text-base hover:bg-primary-700 hover:text-primary-100 transition-all ${
        activeFilter === filter ? "bg-primary-700 text-primary-100" : ""
      }`}
    >
      {children}
    </button>
  );
}
