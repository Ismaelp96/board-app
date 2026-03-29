import { Header } from './header';

export default function BoardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='w-full max-w-405 mx-auto p-10 flex flex-col gap-8 h-dvh'>
			<Header />
			{children}
		</div>
	);
}
