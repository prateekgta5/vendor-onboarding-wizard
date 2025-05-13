
import React from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface SelectBusinessTypeFieldProps {
  control: Control<VendorFormSchemaType>;
}

export const SelectBusinessTypeField: React.FC<SelectBusinessTypeFieldProps> = ({ control }) => {
  const businessTypes = [
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Corporate Gifting", label: "Corporate Gifting" },
    { value: "Reseller", label: "Reseller" },
    { value: "Wholesaler", label: "Wholesaler" },
    { value: "Other", label: "Other" }
  ];

  return (
    <FormField
      control={control}
      name="business_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Type *</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {businessTypes.map((type) => (
              <FormField
                key={type.value}
                control={control}
                name="business_type"
                render={({ field: itemField }) => {
                  return (
                    <FormItem
                      key={type.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(type.value as any)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, type.value]
                              : field.value.filter(
                                  (value) => value !== type.value
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {type.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
