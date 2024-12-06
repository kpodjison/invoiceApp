import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

interface CustomSheetProps{
    children: React.ReactNode;
    title: string;
    type?: string;
    trigerBtnText?: string;
    btnColor?: string;
}

const CustomSheet = ({children,title,type,trigerBtnText,btnColor}:CustomSheetProps) => {
    const currentPath = window.location.href;

    const isActive = (url: string): boolean => {
        return currentPath.includes(url);
    };
    return (
        <section className="">
            <Sheet>
                <SheetTrigger className="float-right">
                    {
                        type === 'form' ?
                             (<button
                                className={`font-medium ${btnColor} text-white p-1 rounded text-center px-5`}
                                >
                                   {trigerBtnText}
                            </button>) :
                            
                            <button className={`flex items-center ${btnColor ? btnColor : "bg-blue-700"}  px-3 py-2  text-white rounded gap-2`}>
                                <span>
                                    <img
                                        src="/storage/icons/plus.svg"
                                        className="bg-white rounded-full"
                                    />
                                </span>
                                {trigerBtnText ? trigerBtnText : 'Add'}
                            </button>
                    }                       
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                        <h1
                            className="sm:text-[1.3rem] 2xl:text-[1.5rem] font-bold text-center text-blue-600"
                        >
                            {title}
                        </h1>
                    <div className="mobilenav-sheet">
                            {children}
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default CustomSheet;
