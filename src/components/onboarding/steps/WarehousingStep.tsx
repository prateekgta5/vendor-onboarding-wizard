
import React from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface WarehousingStepProps {
  control: Control<VendorFormSchemaType>;
  watchRequiresWarehousing: boolean;
}

export const WarehousingStep: React.FC<WarehousingStepProps> = ({ control, watchRequiresWarehousing }) => {
  const warehouseLocations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Other"
  ];
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="requires_warehousing"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Warehousing Need</FormLabel>
              <FormDescription>
                Do you require warehousing services with BaseCampMart?
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
      
      {watchRequiresWarehousing && (
        <div className="space-y-6 pl-4 border-l-2 border-indigo-100">
          <FormField
            control={control}
            name="preferred_warehouse_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Warehouse Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouseLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="storage_volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Storage Volume (in cubic meters)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter estimated volume" {...field} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="storage_duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Duration (months)</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[3]}
                    min={1}
                    max={12}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>9</span>
                  <span>12</span>
                </div>
                <p className="text-center mt-2 text-sm">
                  {field.value || '3'} {(field.value === '1' || field.value === 1) ? 'month' : 'months'}
                </p>
              </FormItem>
            )}
          />
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <div>
                <h4 className="font-medium text-blue-800">Warehousing Information</h4>
                <p className="text-sm text-blue-700 mt-1">
                  BaseCampMart offers warehousing solutions across major cities in India. 
                  The monthly charge depends on the storage volume and duration. A detailed 
                  pricing will be provided after application review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!watchRequiresWarehousing && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-gray-600 text-sm">
            If you don't require warehousing services, you will be responsible for storing
            and shipping products as per the orders. Our system will automatically notify 
            you about new orders to fulfill.
          </p>
        </div>
      )}
    </div>
  );
};
