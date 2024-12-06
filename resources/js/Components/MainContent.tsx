export default  function MainContent({children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <>
            <div className="min-w-full sm:min-w-[0] w-[100%] bg-gray-100 px-8 py-6" id="page-content-wrapper">
                {children}

            </div>
        </>
    )
}
