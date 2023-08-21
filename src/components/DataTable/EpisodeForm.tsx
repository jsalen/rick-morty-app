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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type Episode } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface IEpisodeForm {
  episode: Episode;
}

const formSchema = z.object({
  name: z.string().nonempty(),
  air_date: z.string().nonempty(),
  episode: z.string().nonempty(),
});

export const EpisodeForm = ({ episode }: IEpisodeForm): JSX.Element => {
  const { updateItem } = useLocalStorage('episode');
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: episode.name ?? '',
      air_date: episode.air_date ?? '',
      episode: episode.episode ?? '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateItem(episode.id, values, 'episode');

    toast({
      title: 'Episode Edited',
      description: `${values.name} was edited successfully`,
    });
  };

  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'outline' })}>
        Edit
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle className="text-3xl min-w-max">Episode</SheetTitle>
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
                name="air_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Air Date <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="March, 10, 2010"
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
                name="episode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Episode <span className="text-red-600">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Episode"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
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
