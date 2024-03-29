'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { z } from 'zod';

import { DatePicker } from '../ui/date-picker';
import { TimePicker } from '../ui/time-picker/time-picker';

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

const formSchema = z.object({
  date: z.date(),
  time: z.date(),
});

const FormSection = ({
  isFetching,
  defaultDateTime,
  onFormSubmitCallback,
}: {
  isFetching: boolean;
  defaultDateTime?: Date;
  onFormSubmitCallback: (dateTime: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: dayjs(defaultDateTime).toDate(),
      time: dayjs(defaultDateTime).toDate(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { date, time } = values;
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const formattedTime = dayjs(time).format('HH:mm:ss');
    const dateTime = formattedDate + 'T' + formattedTime;

    onFormSubmitCallback(dateTime);
  };

  return (
    <section>
      <div className='container py-6 border-b'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex flex-col min-[420px]:flex-row gap-4 md:gap-6 mb-6'>
              <div className='text-sm'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className='text-xs'>
                        Please select a date time
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          btnClassName='h-full !mt-1 w-full min-[400px]:w-[180px] sm:w-[280px]'
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
                      <TimePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='!mt-0' disabled={isFetching}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default FormSection;
