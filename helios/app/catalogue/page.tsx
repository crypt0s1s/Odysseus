'use client'

import Image from 'next/image'
import minus from '../ui/icons/Minus.svg'
import plus from '../ui/icons/plus.svg'
import { useContext } from 'react'
import { StoreContext } from '../api'
import { useQuery } from '@tanstack/react-query'

export default function Page() {
    const { catalogue } = useContext(StoreContext)
    
    const { isPending, error } = useQuery({
        queryKey: ['catalogue'],
        queryFn: () =>
            catalogue.getCatalogue()
            // fetch('https://api.github.com/repos/TanStack/query').then((res) =>
            //     res.json(),
            // ),
    })

    
    if (isPending) {

    } else {

    }


    //const catalogueItems = await fetch('http://127.0.0.1:8080/catalogue')

    // const i2 = await getCatalogue()

    return (
        <main className='bg-white p-8'>
            <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {
                isPending ?
                [...Array(8)].map((_, i) => <CatalogueItemLoader key={i}/>)
                : <div> <h5>Loaded</h5></div>
            }
               {/* 
                {i2.map((item) => {
                    return (
                        <CatalogueItemComponent2 item={item} key={item.id.toString()} />
                    )
                })}
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                <CatalogueItemComponent />
                */}
            </div>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'></div>
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'></div>
        </main>
    )
}

function CatalogueItemLoader() {
     return (
         <div className='rounded-2xl flex flex-col bg-gray-200'>
            <div className='h-96 w-[175] bg-gray-200'> </div>
            <div className='m-4 flex-col flex grow justify-between'>
                <div className='px-2 flex-row flex justify-between'>
                    <h2 className='text-xl text-black'>loading</h2>
                    <div className='w-2' />
                    <h4 className='text-l text-black'>price loading</h4>
                </div>
                <div className='h-4' />
                <div className='justify-end align-bottom'>
                    <AmountSelector />
                </div>
            </div>
         </div>
     )
}

// function CatalogueItemComponent2({ item }: { item: CatalogueItem }) {
//     return (
//         <div className='rounded-2xl flex flex-col bg-gray-200'>
//             <Image
//                 src={
//                     'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c6526d4b-644a-4242-b86f-d9e6e8eb83ea/challenger-dri-fit-13cm-brief-lined-running-shorts-57jvzH.png'
//                 }
//                 className='w-full h-auto rounded-t-2xl'
//                 alt='image stolen from nike'
//                 width={700}
//                 height={475}
//                 sizes='100vw'
//             />
//             <div className='m-4 flex-col flex grow justify-between'>
//                 <div className='px-2 flex-row flex justify-between'>
//                     <h2 className='text-xl text-black'>{item.name}</h2>
//                     <div className='w-2' />
//                     <h4 className='text-l text-black'>${item.price.toString()}</h4>
//                 </div>
//                 <div className='h-4' />
//                 <div className='justify-end align-bottom'>
//                     <AmountSelector />
//                 </div>
//             </div>
//         </div>
//     )
// }
// 
// function CatalogueItemComponent() {
//     return (
//         <div className='rounded-2xl flex flex-col bg-gray-200'>
//             <Image
//                 src={
//                     'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c6526d4b-644a-4242-b86f-d9e6e8eb83ea/challenger-dri-fit-13cm-brief-lined-running-shorts-57jvzH.png'
//                 }
//                 className='w-full h-auto rounded-t-2xl'
//                 alt='image stolen from nike'
//                 width={700}
//                 height={475}
//                 sizes='100vw'
//             />
//             <div className='m-4'>
//                 <div className='px-2 flex-row flex justify-between'>
//                     <h2 className='text-xl text-black'>Cool person shorts</h2>
//                     <div className='w-2' />
//                     <h4 className='text-l text-black'>$420.69</h4>
//                 </div>
//                 <div className='h-4' />
//                 <AmountSelector />
//             </div>
//         </div>
//     )
// }

function AmountSelector() {
    return (
        <div className='w-full p-1 flex flex-row justify-between bg-white rounded-md'>
            <button>
                <Image src={minus} alt='Minus sign' width={24} height={24} />
            </button>
            <p className='text-black'>1</p>
            <button>
                <Image src={plus} alt='Plus sign' width={24} height={24} />
            </button>
        </div>
    )
}
