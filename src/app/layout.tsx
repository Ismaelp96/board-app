import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ReactQueryProvider } from '@/lib/react-query';

import './globals.css';
import React from 'react';

export const metadata: Metadata = {
	title: {
		template: '%s | Product Roadmap',
		default: 'Product Roadmap',
	},
	description: 'Follow the development progress of our entire platform',
};

const interFont = Inter({ subsets: ['latin'] });

export default function RootLayout({
	modal,
	children,
}: Readonly<{
	modal: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={interFont.className}>
			<body className='bg-navy-950 text-navy-50 antialiased'>
				<ReactQueryProvider>
					<NuqsAdapter>
						{modal}
						{children}
					</NuqsAdapter>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
