/**
 * 
 * @param message message to display when  a resource is not found
 * @param minHeight minimum height of a container (it must be a tailwind min-h class) 
 * @returns 
 */

export default function EmptyState({ message, minHeight }: { message: string, minHeight?: string }) {
    return (
        <div className='w-full'>
            <div className={`${minHeight ? minHeight : "min-h-[60vh]"} bg-gray-100 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6`}>
                <img src={'/empty.svg'} width={300} height={300} alt='empty' />
                <h1 className='text-xl font-semibold text-gray-700'>{message}</h1>
            </div>
        </div>
    )
}