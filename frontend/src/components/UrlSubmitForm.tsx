import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowUpRight, Undo2 } from 'lucide-react';

const formSchema = z.object({
	url: z.string().url({
		message: 'Invalid URL',
	}),
});

type UrlSubmitFormProps = {
	setShortUrl: (shortUrl: string) => void;
};

const UrlSubmitForm = ({ setShortUrl }: UrlSubmitFormProps) => {
	const [disabled, setDisabled] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setDisabled(true);
			const response = await fetch('http://localhost:3000/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				const shortUrl = (await response.json()).shortUrl;
				setShortUrl(`http://localhost:3000/${shortUrl}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Reset form and enable button
	const handleClick = () => {
		form.reset();
		setDisabled(false);
		setShortUrl('');
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col sm:flex-row sm:gap-x-2"
			>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="w-full sm:w-2/3">
							<FormLabel className="text-sm md:text-md text-muted-foreground">
								Long URL
							</FormLabel>
							<FormControl>
								<Input
									placeholder="https://paste-here-your-long-url/"
									{...field}
									disabled={disabled}
									className="hover:border-accent-foreground"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="w-full sm:w-1/3 flex gap-x-2 overflow-clip">
					<Button
						type="submit"
						className="w-full"
						disabled={disabled}
					>
						Submit <ArrowUpRight className="w-4 h-4 ml-2" />
					</Button>
					<Undo2
						className="border border-muted-foreground/50 rounded-sm text-muted-foreground p-2 w-10 h-10 hover:scale-90 hover:cursor-pointer flex-shrink-0"
						onClick={handleClick}
					/>
				</div>
			</form>
		</Form>
	);
};
UrlSubmitForm.displayName = 'UrlSubmitForm';

export default UrlSubmitForm;
