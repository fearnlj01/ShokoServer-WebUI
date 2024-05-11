import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircleOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { Icon } from '@mdi/react';

export type Option = {
  label: string;
  value: string;
  default?: boolean;
};

const DropDownOptionIcons = React.memo(() => (
  <>
    <Icon path={mdiChevronUp} size={1} className="hidden shrink-0 self-center group-aria-expanded:block" />
    <Icon path={mdiChevronDown} size={1} className="shrink-0 self-center group-aria-expanded:hidden" />
  </>
));

const SelectedOptionIcons = React.memo(() => (
  <>
    <Icon
      path={mdiCheckboxBlankCircleOutline}
      size={1}
      className="shrink-0 text-panel-icon-action group-aria-selected:hidden"
    />
    <Icon
      path={mdiCheckboxMarkedCircleOutline}
      size={1}
      className="hidden shrink-0 text-panel-icon-action group-aria-selected:block"
    />
  </>
));

type Props = {
  id: string;
  label?: string;
  /** Each option must have a unique `value` property */
  options: Option[];
  placeholder?: string;
  className?: string;
  /** Called on selection change */
  onChange: (options: string[], id: string) => void;
};
function SelectMultiple({ className, id, label, onChange, options, placeholder = '- None -' }: Props) {
  const defaultOptions = options.filter(o => o?.default);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  // Emits the selected values, along with the parent id.
  useEffect(() => {
    onChange(selectedOptions.map(o => o.value), id);
  }, [id, onChange, selectedOptions]);

  const updateInternalState = (optArr: Option[]) => setSelectedOptions(optArr);

  return (
    <div className={className}>
      {label && (
        <div className="mb-2 text-base font-semibold">
          {label}
        </div>
      )}
      <Listbox value={selectedOptions} onChange={updateInternalState} multiple>
        <Listbox.Button
          as="div"
          className="group flex w-full cursor-pointer justify-between rounded-lg border border-panel-border bg-panel-input px-4 py-3 text-left"
        >
          {selectedOptions.length === 0 ? placeholder : selectedOptions.map(opt => opt.label).join(', ')}
          <DropDownOptionIcons />
        </Listbox.Button>
        <Listbox.Options
          as="div"
          className="-mt-6 flex flex-col gap-y-2 rounded-lg bg-panel-input p-6 focus-visible:outline-none"
        >
          <hr className="rounded-lg border-DEFAULT opacity-35" />
          {options.map(opt => (
            <Listbox.Option
              as="div"
              key={`${id}-${opt.label}`}
              value={opt}
              className="group flex h-8 cursor-pointer select-none items-center justify-between"
            >
              {opt.label}
              <SelectedOptionIcons />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default SelectMultiple;
