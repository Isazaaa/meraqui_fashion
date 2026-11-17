import React, { useId } from 'react';
import { FilterGroup, FilterOption, SizeChip } from './FilterGroup';

/**
 * The three filter groups (Tipo, Talla, Precio). Shared by the desktop sidebar
 * and the mobile drawer; useId keeps radio names unique between the two.
 */
const FilterGroups = ({ filters, facets, onSubcategory, onToggleSize, onPrice }) => {
  const uid = useId();
  const hasSubcategories = facets.subcategories.length > 1;

  return (
    <div>
      {hasSubcategories && (
        <FilterGroup title="Tipo">
          <div role="radiogroup" aria-label="Tipo">
            {facets.subcategories.map((opt) => (
              <FilterOption
                key={opt.value}
                type="radio"
                name={`${uid}-subcategory`}
                label={opt.label}
                count={opt.count}
                checked={filters.subcategory === opt.value}
                disabled={opt.count === 0 && filters.subcategory !== opt.value}
                onChange={() => onSubcategory(opt.value)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {facets.sizes.length > 0 && (
        <FilterGroup title="Talla">
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((opt) => {
              const checked = filters.sizes.includes(opt.value);
              return (
                <SizeChip
                  key={opt.value}
                  label={opt.label}
                  checked={checked}
                  disabled={opt.count === 0 && !checked}
                  onChange={() => onToggleSize(opt.value)}
                />
              );
            })}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Precio">
        <div role="radiogroup" aria-label="Precio">
          {facets.prices.map((opt) => (
            <FilterOption
              key={opt.value}
              type="radio"
              name={`${uid}-price`}
              label={opt.label}
              count={opt.count}
              checked={filters.price === opt.value}
              disabled={opt.count === 0 && filters.price !== opt.value}
              onChange={() => onPrice(opt.value)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
};

export default FilterGroups;
