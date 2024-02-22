import { Input } from '@/components/ui/input';
import { Tooltip } from '@radix-ui/react-tooltip';
import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type UrlCopyFormProps = {
	shortUrl: string;
};

const UrlCopyForm = ({ shortUrl }: UrlCopyFormProps) => {
	const handleClick = () => {
		navigator.clipboard.writeText(shortUrl);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="flex gap-x-2 items-center">
					<Input
						value={shortUrl}
						readOnly
						placeholder="http://localhost:3000/shorten..."
						onClick={handleClick}
						className={cn(
							'hover:border-accent-foreground hover:cursor-copy',
							shortUrl
								? 'animate-pulse border-accent-foreground'
								: '',
						)}
					/>
					<Copy
						className="border border-muted-foreground/50 rounded-sm text-muted-foreground p-2 w-10 h-10 hover:scale-90"
						onClick={handleClick}
					/>
				</TooltipTrigger>
				<TooltipContent className="text-muted-foreground">
					Click to copy
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
UrlCopyForm.displayName = 'UrlCopyForm';

export default UrlCopyForm;
