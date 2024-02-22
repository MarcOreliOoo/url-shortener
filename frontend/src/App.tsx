import { useState } from 'react';
import UrlSubmitForm from '@/components/UrlSubmitForm';
import UrlCopyForm from '@/components/UrlCopyForm';
import Card from '@/components/Card';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const App = () => {
	const [shortUrl, setShortUrl] = useState('');

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-50 dark:from-gray-950 dark:to-gray-800 text-foreground max-w-screen-2xl overflow-hidden m-auto px-2 pt-2 pb-2 flex items-center justify-evenly w-full h-full relative">
			<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center absolute top-0 pt-8 bg-transparent">
				URL Shortener
			</h1>
			<div className="relative flex flex-col items-center justify-evenly gap-y-4 pt-8 md:gap-y-8 lg:gap-y-16 w-full h-[50vh]">
				<div className="absolute -top-10 left-20 size-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute top-20 sm:top-10 md:top-0 right-10 size-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-0 left-20 size-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
				<Card title="Step 1" paragraph="Copy & paste your long URL!">
					<UrlSubmitForm setShortUrl={setShortUrl} />
				</Card>
				<div>
					<ArrowDown
						className={cn(
							'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12',
							shortUrl
								? 'text-primary scale-110 animate-bounce'
								: 'text-muted-foreground scale-90',
						)}
					/>
				</div>
				<Card
					title="Step 2"
					paragraph="Copy your short URL and use it in your browser!"
				>
					<UrlCopyForm shortUrl={shortUrl} />
				</Card>
			</div>
		</main>
	);
};

export default App;
