'use client';

import React from 'react';
import { DatePicker } from '../ui/date-picker';
import { TimePicker } from '../ui/time-picker/time-picker';
import { Label } from '@radix-ui/react-label';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { z } from 'zod';

const formSchema = z.object({
  date: z.date(),
  time: z.date(),
});

const FormSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: '',
    // },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section>
      <div className='container py-6 border-b'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex gap-10 items-end'>
              <div className='flex gap-4 md:gap-6'>
                <div className='text-sm'>
                  <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel className='text-xs'>
                          Please select a date and time
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            btnClassName='h-full !mt-1'
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                      <FormControl>
                        <TimePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default FormSection;