import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react';
import { IoCheckmarkOutline as CheckIcon,  } from "react-icons/io5";
import { LuChevronsUpDown as ChevronUpDownIcon } from "react-icons/lu";
// import React from 'react';

type Option = {id:number; name:string;}

export default function ComboboxCarnaval({
    options = [],
    onChange,
    option
}:{ options: Option[],onChange:(id:number)=>void, option?:Option }) {
  // const [selected, setSelected] = useState(option)
  const [query, setQuery] = useState('')

  const selected = option;

  const filteredOption =
    query === ''
      ? options
      : options.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  // React.useEffect(() => {},[])
  return (
    <div className="">
      <Combobox 
        value={selected}
        onChange={(value)=>{ onChange(value.id); }}
        by={(a,b)=>a.id === b.id}
      >
        <div className="relative mt-1">
          <div className="border border-gray-300 relative w-full cursor-default overflow-hidden rounded-md bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(item:Option) => item.name}
              onChange={(event) => setQuery(event.target.value)}
              required
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base rounded-md ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOption.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOption.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
