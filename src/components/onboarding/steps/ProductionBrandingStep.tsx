
import React from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductionBrandingStepProps {
  control: Control<VendorFormSchemaType>;
  watchInHouseProduction: boolean;
  watchInHouseBranding: boolean;
}

export const ProductionBrandingStep: React.FC<ProductionBrandingStepProps> = ({ 
  control, 
  watchInHouseProduction, 
  watchInHouseBranding 
}) => {
  const productTypes = [
    { id: "apparel", label: "Apparel" },
    { id: "gifts", label: "Gifts/Accessories" },
    { id: "electronics", label: "Electronics" },
    { id: "custom", label: "Custom Products (Non-branded)" },
    { id: "others", label: "Others" }
  ];
  
  const brandingCapabilities = [
    { id: "printing", label: "Logo Printing" },
    { id: "packaging", label: "Custom Packaging" },
    { id: "stickers", label: "Stickers/Decals" },
    { id: "embroidery", label: "Embroidery" },
    { id: "others", label: "Others" }
  ];
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Production Capabilities</h3>
        
        <FormField
          control={control}
          name="in_house_production"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">In-house Production</FormLabel>
                <FormDescription>
                  Do you manufacture products in-house?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {watchInHouseProduction && (
          <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
            <FormField
              control={control}
              name="production_capacity"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Production Capacity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Small" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Small (Up to 500 units per month)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium (500-5000 units per month)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Large" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Large (5000+ units per month)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="products_manufactured_in_house"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Products Manufactured In-House</FormLabel>
                    <FormDescription>
                      Select all that apply
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {productTypes.map((item) => (
                      <FormField
                        key={item.id}
                        control={control}
                        name="products_manufactured_in_house"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={(field.value || []).includes(item.label as any)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    const updated = checked
                                      ? [...current, item.label]
                                      : current.filter((value) => value !== item.label);
                                    field.onChange(updated);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Branding Capabilities</h3>
        
        <FormField
          control={control}
          name="in_house_branding"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">In-house Branding</FormLabel>
                <FormDescription>
                  Do you have in-house branding capabilities?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {watchInHouseBranding && (
          <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
            <FormField
              control={control}
              name="branding_capacity"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Branding Capacity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Small" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Small (Up to 500 units per month)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium (500-5000 units per month)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Large" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Large (5000+ units per month)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="branding_capabilities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Branding Capabilities</FormLabel>
                    <FormDescription>
                      Select all that apply
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {brandingCapabilities.map((item) => (
                      <FormField
                        key={item.id}
                        control={control}
                        name="branding_capabilities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={(field.value || []).includes(item.label as any)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    const updated = checked
                                      ? [...current, item.label]
                                      : current.filter((value) => value !== item.label);
                                    field.onChange(updated);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
