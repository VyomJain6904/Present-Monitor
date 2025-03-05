import Link from "next/link";

const DashboardPage = () => {
    return ( 
        <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
            <div className="p-4 relative z-10 w-full text-center">
                <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Present Monitor</h1>
                <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
                Welcome to Present Monitor! Automate your daily attendance checks with ease. We send your attendance updates via email and WhatsApp. Just sign up, provide your credentials, and let us handle the rest. Stay informed effortlessly!
                <div className="mt-4">
                    <Link href={'/Subscribe'}>
                        Subscribe for Updates
                    </Link>
                </div>
                </p>
            </div>
        </div>
     );
}
 
export default DashboardPage;
