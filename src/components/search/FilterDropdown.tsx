import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface FilterDropdownProps {
  setStatus: Dispatch<SetStateAction<string[]>>;
}

export default function FilterDropdown({ setStatus }: FilterDropdownProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleMenu = (status: string) => {
    setStatus([status]);
    setSelected([status]);
  };
  return (
    <div>
      <Menu as="div" className="relative">
        <div className="w-full">
          <Menu.Button className="m-auto ml-0 flex w-[5rem] items-center  justify-around rounded-[1.1875rem] border-[0.0625rem] border-[#DBDBDB] bg-white px-3 py-2 text-sm font-medium text-[#767676]">
            정렬
            <Image
              src="/svg/icons/arrow_down.svg"
              alt="checked"
              width={12}
              height={10}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 mt-2 w-full divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  className="flex w-full items-center justify-between border-b-[0.0625rem] py-3 px-2 text-sm"
                  onClick={() => {
                    setStatus([]);
                    setSelected([]);
                  }}
                >
                  모두
                  {selected.length === 0 ? (
                    <Image
                      src="/svg/icons/checked_brand.svg"
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex w-full items-center justify-between border-b-[0.0625rem] py-3 px-2 text-sm"
                  onClick={() => handleMenu('processing')}
                >
                  경매중
                  {selected.includes('processing') ? (
                    <Image
                      src="/svg/icons/checked_brand.svg"
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex w-full items-center justify-between py-3 px-2 text-sm"
                  onClick={() => handleMenu('sales_success')}
                >
                  경매완료
                  {selected.includes('sales_success') ? (
                    <Image
                      src="/svg/icons/checked_brand.svg"
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
