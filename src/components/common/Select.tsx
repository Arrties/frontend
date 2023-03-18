import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import type {
  FieldPath,
  UseFormSetValue,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form';
interface SelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  options: { value: string }[];
  label?: string;
}

export default function Select<T extends FieldValues>({
  name,
  setValue,
  options,
  label,
}: SelectProps<T>) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    if (selected !== undefined)
      setValue(name, selected.value as FieldPathValue<T, FieldPath<T>>);
  }, [selected, name, setValue]);

  return (
    <div>
      <label className="text-14 leading-8">{label}</label>
      <Listbox name={name} value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative text-12">
            <Listbox.Button className="relative h-[52px] w-full cursor-pointer rounded-[4px]  border border-[#DBDBDB] focus-visible:border-[#DBDBDB]">
              <div className="p-3 text-left">{selected.value}</div>
              <div
                className={`absolute right-[10px] bottom-[13px] ${
                  open && 'rotate-180 transform transition'
                }`}
              >
                <Image
                  src="/svg/icons/arrow_down_black.svg"
                  width={20}
                  height={20}
                  alt="close"
                />
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full rounded-md ">
                {options.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative flex h-[52px] cursor-pointer items-center border border-[#DBDBDB] bg-white p-3 first:rounded-t-[4px] last:rounded-b-[4px] ${
                        active && 'font-semibold'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.value}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
