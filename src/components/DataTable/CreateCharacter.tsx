'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type Character } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useToast } from '../ui/use-toast';

const formSchema = z.object({
  name: z.string().nonempty().trim().min(2),
  status: z.string().nonempty({
    message: 'Status is required',
  }),
  species: z.string().nonempty({
    message: 'Species is required',
  }),
  type: z.string().optional(),
  gender: z.string().nonempty({
    message: 'Gender is required',
  }),
  origin: z
    .string()
    .nonempty({
      message: 'Origin is required',
    })
    .trim()
    .min(2),
  location: z
    .string()
    .nonempty({
      message: 'Location is required',
    })
    .trim()
    .min(2),
});

export const CreateCharacter = (): JSX.Element => {
  const { addItem } = useLocalStorage<Character>('character');
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: '',
      location: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addItem(values);

    toast({
      title: 'Character Created',
      description: `${values.name} was created successfully`,
    });
  };

  return (
    <Sheet>
      <SheetTrigger className={`${buttonVariants()} min-w-fit`}>
        Create Character
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle className="text-3xl min-w-max">
            Character Information
          </SheetTitle>
        </SheetHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="alive">Alive</SelectItem>
                        <SelectItem value="dead">Dead</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Species <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="human">Human</SelectItem>
                        <SelectItem value="alien">Alien</SelectItem>
                        <SelectItem value="robot">Robot</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Origin <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Origin" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button>Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
