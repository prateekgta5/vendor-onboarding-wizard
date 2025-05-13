
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface WarehousingStepProps {
  control: Control<VendorFormSchemaType>;
  watchRequiresWarehousing: boolean;
}

const WarehousingStep: React.FC<WarehousingStepProps> = ({
  control,
  watchRequiresWarehousing
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Warehousing Preferences & Compliance</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="requires_warehousing"
            render={({ field }) => (
              <Checkbox
                id="requires_warehousing"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="requires_warehousing">Do you require warehousing for your products?</Label>
        </div>
        
        {watchRequiresWarehousing && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_warehouse_location">Preferred Warehouse Location</Label>
              <Controller
                control={control}
                name="preferred_warehouse_location"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warehouse_location">Detailed Location</Label>
              <Input
                id="warehouse_location"
                placeholder="Enter detailed location"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storage_volume">Storage Volume</Label>
                <Input
                  id="storage_volume"
                  placeholder="e.g., 500 sq. ft."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage_duration">Storage Duration</Label>
                <Input
                  id="storage_duration"
                  placeholder="e.g., 6 months"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarehousingStep;
