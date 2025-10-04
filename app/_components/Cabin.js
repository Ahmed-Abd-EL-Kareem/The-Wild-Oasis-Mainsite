import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-3 px-4 sm:px-6 lg:px-10 mb-12 sm:mb-16 lg:mb-24">
      <div className="relative scale-[1.15] -translate-x-3 order-2 lg:order-1">
        <Image
          fill
          className="object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="order-1 lg:order-2">
        <h3 className="text-accent-100 font-black text-4xl sm:text-5xl lg:text-7xl mb-5 translate-x-0 lg:translate-x-[-254px] bg-primary-950 p-4 sm:p-6 pb-1 w-full lg:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-base sm:text-lg text-primary-300 mb-6 sm:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 sm:gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
