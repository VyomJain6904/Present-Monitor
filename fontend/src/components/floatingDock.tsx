import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandX,
	IconHome,
	IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockDemo() {
	const links = [
		{
			title: "Home",
			icon: (
				<IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/",
		},
		{
			title: "Details",
			icon: (
				<IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/details",
		},
		{
			title: "Aceternity UI",
			icon: (
				<Image
					src="https://assets.aceternity.com/logo-dark.png"
					width={20}
					height={20}
					alt="Aceternity Logo"
				/>
			),
			href: "#",
		},
		{
			title: "Twitter",
			icon: (
				<IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://x.com/home",
		},
		{
			title: "Linkedin",
			icon: (
				<IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://www.linkedin.com/in/vyom-maloo-236aa7250/",
		},
		{
			title: "GitHub",
			icon: (
				<IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://github.com/VyomOp2",
		},
	];
	return (
		<div className="flex items-center justify-center h-[35rem] w-full">
			<FloatingDock mobileClassName="translate-y-20" items={links} />
		</div>
	);
}
