import React from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WarehousingStepProps {
  control: Control<VendorFormSchemaType>;
  watchRequiresWarehousing: boolean;
}

export const WarehousingStep: React.FC<WarehousingStepProps> = ({ control, watchRequiresWarehousing }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="requires_warehousing"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requires_warehousing"
                className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                checked={field.value}
                onChange={field.onChange}
              />
              <FormLabel htmlFor="requires_warehousing" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Do you require warehousing services?
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watchRequiresWarehousing && (
        <div className="space-y-4 pl-6 border-l-2 border-gray-200">
          <FormField
            control={control}
            name="preferred_warehouse_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Warehouse Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="warehouse_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>If 'Other', please specify location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter warehouse location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="storage_volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Storage Volume (Cubic Feet)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter storage volume" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="storage_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Storage Duration (Months)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter storage duration" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 mr-2 mt-1">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div>
                <h4 className="font-medium text-orange-800">Warehousing Information</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Providing accurate warehousing details helps us allocate appropriate resources
                  and optimize logistics for your products.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
