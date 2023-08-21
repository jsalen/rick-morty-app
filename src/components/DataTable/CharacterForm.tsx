'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type Character } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface ICharacterForm {
  formAction: 'create' | 'update';
  character?: Character;
  triggerHeading: string;
}

const formSchema = z.object({
  name: z.string().nonempty(),
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

export const CharacterForm = ({
  character,
  formAction,
  triggerHeading,
}: ICharacterForm): JSX.Element => {
  const { addItem, updateItem } = useLocalStorage<Character>('character');
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: character?.name ?? '',
      status: character?.status ?? '',
      species: character?.species ?? '',
      type: character?.type ?? '',
      gender: character?.gender ?? '',
      origin: character?.origin.name ?? '',
      location: character?.location.name ?? '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (formAction === 'create') {
      addItem(values);

      toast({
        title: 'Character Created',
        description: `${values.name} was created successfully`,
      });

      form.reset();
    }

    if (formAction === 'update') {
      console.log(values);
      updateItem(character?.id ?? 0, values, 'character');

      toast({
        title: 'Character Edited',
        description: `${values.name} was edited successfully`,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        className={`${buttonVariants({
          variant: formAction === 'update' ? 'outline' : 'default',
        })} min-w-fit`}
      >
        {triggerHeading}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle className="text-3xl min-w-max">Character</SheetTitle>
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
                      <Input
                        placeholder="Name"
                        {...field}
                        value={field.value}
                      />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Alive">Alive</SelectItem>
                        <SelectItem value="Dead">Dead</SelectItem>
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toLowerCase()}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toLowerCase()}
                    >
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
                <Button>Send</Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
