import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';

import { Label } from '@/src/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { Slider } from '@/src/components/ui/slider';

import { useToast } from '@/src/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../../convex/_generated/api';

const formSchema = z.object({
  name: z.string(),
  food: z.string(),
  mood: z.number(),
  water: z.string(),
});

const moodToEmojiMap: Record<string, string> = {
  1: '😞',
  2: '😐',
  3: '😀',
  4: '😄',
  5: '😁',
  6: '😂',
  7: '😃',
  8: '😄',
  9: '😅',
  10: '😆',
};

function Home() {
  const { toast } = useToast();

  const [moodValue, setMoodValue] = useState<number>(5);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const addEntry = useMutation(api.entry.createEntry);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      food: '',
      mood: 1,
      water: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.food && values.mood && values.name && values.water) {
      setLoading(true);
      const data = await addEntry({
        food: values.food,
        mood: values.mood,
        name: values.name,
        water: values.water,
      });

      setLoading(false);

      if (data) {
        setSuccess(true);
      }
    } else {
      toast({
        variant: 'destructive',
        title: "Uh oh! You didn't fill out the form",
        description: "It's only 4 questions. C`mon try again",
      });
    }
  }

  return (
    <div className='flex items-center justify-center mt-10'>
      <Form {...form}>
        {success && (
          <Card>
            <CardHeader>
              <CardTitle>
                <FormLabel className='text-xl'>
                  Thank you for your time
                </FormLabel>
              </CardTitle>
              <CardDescription>
                THIS DATA WILL BE USED FOR FUTURE PURPOSE
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        )}

        {!success && (
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <FormLabel className='text-xl'>
                        Specify your name
                      </FormLabel>
                    </CardTitle>
                    <CardDescription>
                      NO ANY OTHER PERSON, ONLY HER!!!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormItem>
                      <FormControl className='!mt-4'>
                        <FormControl>
                          <Input
                            placeholder='SAMINA RANI SHRESTHA ONLY'
                            {...field}
                          />
                        </FormControl>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </CardContent>
                </Card>
              )}
            />

            <FormField
              control={form.control}
              name='food'
              render={({ field }) => (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <FormLabel className='text-xl'>
                          1. Did you eat?
                        </FormLabel>
                      </CardTitle>
                      <CardDescription>
                        IT'S VERY IMPORTANT FOR ME THAT YOUR TUMMY IS FULL
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormItem>
                        <FormControl className='!mt-4'>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex'
                          >
                            <FormItem className='flex items-center space-x-3 space-y-0 mr-6'>
                              <FormControl>
                                <RadioGroupItem value='Yes' />
                              </FormControl>
                              <FormLabel className='font-normal text-xl'>
                                Yes
                              </FormLabel>
                            </FormItem>

                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='No' />
                              </FormControl>
                              <FormLabel className='font-normal text-xl'>
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    </CardContent>
                  </Card>
                </>
              )}
            />

            <FormField
              control={form.control}
              name='mood'
              render={({ field }) => (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <FormLabel className='text-xl'>
                          2. What's your current mood?
                        </FormLabel>
                      </CardTitle>
                      <CardDescription>
                        YOUR SMILE IS THE SUNSHINE THAT LIGHTS UP MY WORLD
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormItem>
                        <FormControl className='!mt-4'>
                          <div className='text-center'>
                            <Label className='text-xl mb-4 flex justify-center'>
                              <span className='inline-block mr-4'>
                                {moodValue}
                              </span>
                              {moodToEmojiMap[moodValue]}
                            </Label>
                            <Slider
                              defaultValue={[moodValue]}
                              max={10}
                              min={1}
                              step={1}
                              onValueChange={(e) => {
                                field.onChange(e[0]);
                                setMoodValue(e[0]);
                              }}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    </CardContent>
                  </Card>
                </>
              )}
            />

            <FormField
              control={form.control}
              name='water'
              render={({ field }) => (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <FormLabel className='text-xl'>
                          3. Did you drink? How much?
                        </FormLabel>
                      </CardTitle>
                      <CardDescription>
                        ABOUT 11.5 CUPS (2.7 LITERS) OF FLUIDS A DAY FOR WOMEN.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormItem>
                        <FormControl className='!mt-4'>
                          <FormControl>
                            <Input
                              placeholder='1 Cup, 2 Cups, A bottle, A Jar'
                              {...field}
                            />
                          </FormControl>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    </CardContent>
                  </Card>
                </>
              )}
            />

            <Button
              className='w-full bg-blue-800 hover:bg-blue-900'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
}

export default Home;
