
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface ProductionBrandingStepProps {
  control: Control<VendorFormSchemaType>;
  watchInHouseProduction: boolean;
  watchInHouseBranding: boolean;
}

const ProductionBrandingStep: React.FC<ProductionBrandingStepProps> = ({
  control,
  watchInHouseProduction,
  watchInHouseBranding
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Production & Branding Preferences</h2>
      
      <div className="space-y-6 mb-6">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="in_house_production"
            render={({ field }) => (
              <Checkbox
                id="in_house_production"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="in_house_production">Do you have in-house production capabilities?</Label>
        </div>
        
        {watchInHouseProduction && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="production_capacity">Production Capacity</Label>
              <Controller
                control={control}
                name="production_capacity"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select production capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small (Under 500 units/month)</SelectItem>
                      <SelectItem value="Medium">Medium (500-5000 units/month)</SelectItem>
                      <SelectItem value="Large">Large (5000+ units/month)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lead_time_for_production">Lead Time for Production</Label>
              <Input
                id="lead_time_for_production"
                placeholder="e.g., 5 days"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Types of Products Manufactured In-House</Label>
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="products_manufactured_in_house"
                  render={({ field }) => (
                    <>
                      {["Apparel", "Gifts/Accessories", "Electronics", "Custom Products (Non-branded)", "Others"].map((type) => (
                        <div className="flex items-center space-x-2" key={type}>
                          <Checkbox
                            id={`product_type_${type}`}
                            checked={field.value?.includes(type as any)}
                            onCheckedChange={(checked) => {
                              const currentValues = [...(field.value || [])];
                              if (checked) {
                                field.onChange([...currentValues, type]);
                              } else {
                                field.onChange(
                                  currentValues.filter((value) => value !== type)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`product_type_${type}`} className="font-normal">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="in_house_branding"
            render={({ field }) => (
              <Checkbox
                id="in_house_branding"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="in_house_branding">Do you offer in-house branding services?</Label>
        </div>
        
        {watchInHouseBranding && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <Label>What type of branding capabilities do you offer?</Label>
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="branding_capabilities"
                  render={({ field }) => (
                    <>
                      {["Logo Printing", "Custom Packaging", "Stickers/Decals", "Embroidery", "Others"].map((type) => (
                        <div className="flex items-center space-x-2" key={type}>
                          <Checkbox
                            id={`branding_capability_${type}`}
                            checked={field.value?.includes(type as any)}
                            onCheckedChange={(checked) => {
                              const currentValues = [...(field.value || [])];
                              if (checked) {
                                field.onChange([...currentValues, type]);
                              } else {
                                field.onChange(
                                  currentValues.filter((value) => value !== type)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`branding_capability_${type}`} className="font-normal">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branding_capacity">Branding Capacity</Label>
              <Controller
                control={control}
                name="branding_capacity"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branding capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small (Under 500 branded units/month)</SelectItem>
                      <SelectItem value="Medium">Medium (500-5000 branded units/month)</SelectItem>
                      <SelectItem value="Large">Large (5000+ branded units/month)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionBrandingStep;
