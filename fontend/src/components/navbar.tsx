"use client";

import React, { useState } from "react";
import {
	HoveredLink,
	Menu,
	MenuItem,
	ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FloatingDockDemo } from "@/components/floatingDock";

function Navbar({ className }: { className?: string }) {
	const [active, setActive] = useState<string | null>(null);

	return (
		<div
			className={cn(
				"fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
				className
			)}
		>
			<Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem 
                        setActive={setActive} 
                        active={active}
                        item="Home"
                        >
                    </MenuItem>
                </Link>
                <MenuItem 
                    setActive={setActive} 
                    active={active}
                    item="Details"
                    >
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/details">Edit Profile</HoveredLink>   
                            <HoveredLink href="/details">Edit Username</HoveredLink>   
                            <HoveredLink href="/details">Change Password</HoveredLink>       
                        </div>
                </MenuItem>
                <Link href={'/contactus'}>
                    <MenuItem 
                        setActive={setActive} 
                        active={active}
                        item="Contact Us"
                        >
                    </MenuItem>
                </Link>
                
            </Menu>
		</div>
	);
}

export default Navbar;
