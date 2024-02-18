import Image from 'next/image'
import minus from '../../helen/icons/minus.svg'
import plus from '../../helen/icons/plus.svg'
import { ReactElement, useContext } from 'react'
import { CatalogueItem, StoreContext, rootStore } from '../../api'
import { useQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import Layout from './_layout'
import { NextPageWithLayout } from '../_app'

// TODO: move this to the api area
const catalogueQuery = () => {
    return useQuery({
        queryKey: ['catalogue'],
        queryFn: rootStore.catalogue.getCatalogue
    })
}

const CatalogueContent = observer(() => {
    const { catalogue } = useContext(StoreContext)
    const { isPending, error, isSuccess } = catalogueQuery()

    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        { isPending && [...Array(8)].map((_, i) => <CatalogueItemLoader key={i}/>) }
        {
            isSuccess &&
                catalogue.catalogue.map(
                    (item) => <CatalogueItemComponent item={item} />
                )
        }
        </div>
            )
})

const Page: NextPageWithLayout = () => {
    return (
        <main className='bg-white p-8'>
            <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <CatalogueContent />
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'></div>
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'></div>
        </main>
    )
}

function CatalogueItemLoader() {
     return (
         <div className='rounded-2xl flex flex-col bg-gray-200'>
            <div className='h-96 w-[175] bg-gray-200 rounded-2xl'/>
            <div className='m-4 flex-col flex grow justify-between'>
                <div className='px-2 flex-row flex justify-between'>
                    <h2 className='text-xl text-black'>loading</h2>
                    <div className='w-2' />
                    <h4 className='text-l text-black'>price loading</h4>
                </div>
                <div className='h-4' />
                <div className='justify-end align-bottom'>
                    <AmountSelector id={''}/>
                </div>
            </div>
         </div>
     )
}

const CatalogueItemComponent = ({ item }: { item: CatalogueItem }) => {
    return (
         <div className='rounded-2xl flex flex-col bg-gray-200 items-center justify-between p-3'>
            <Image src={item.imageUrl} width={300} height={384} alt={`{item.name} image`} className='rounded-2xl' />
            <div className='pt-2 flex-col flex grow justify-end w-full'>
                <div className='px-2 flex-row flex justify-between'>
                    <h2 className='text-xl text-black'>{item.name}</h2>
                    <div className='w-2' />
                    <h4 className='text-l text-black'>{item.price}</h4>
                </div>
                <div className='h-2' />
                <div className='justify-end align-bottom'>
                    <AmountSelector id={item.id} />
                </div>
            </div>
         </div>
    )
}

const AmountSelector = observer(({ id }: { id: string }) => {
    const { catalogue } = useContext(StoreContext)

    return (
        <div className='w-full p-1 flex flex-row justify-between bg-white rounded-md'>
            <button onClick={() => catalogue.decrementItem(id)}>
                <Image src={minus} alt='Minus sign' width={24} height={24} />
            </button>
            <p className='text-black'>{catalogue.getItemAmount(id).toString()}</p>
            <button onClick={() => catalogue.incrementItem(id)}>
                <Image src={plus} alt='Plus sign' width={24} height={24} />
            </button>
        </div>
    )
})

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page

