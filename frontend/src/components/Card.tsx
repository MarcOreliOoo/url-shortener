type CardProps = {
	title: string;
	paragraph: string;
	children?: React.ReactNode;
};

const Card = ({ title, paragraph, children }: CardProps) => {
	return (
		<div className="w-full sm:w-2/3 h-auto text-card-foreground rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-8 lg:p-12 flex flex-col gap-y-8 md:gap-y-12 relative bg-white/30 dark:bg-black/10 ring-1 ring-border/5 shadow-lg opacity-100 backdrop-blur-3xl">
			<div className="flex flex-col gap-y-2 items-center justify-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-none tracking-tight">
					{title}
				</h2>
				<p className="text-sm md:text-md text-muted-foreground">
					{paragraph}
				</p>
			</div>
			{children}
		</div>
	);
};

export default Card;
