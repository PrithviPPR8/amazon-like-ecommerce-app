// 'use client'
// import { cn, formatCurrency } from '@/lib/utils'

// const ProductPrice = ({
//   price,
//   className,
//   listPrice = 0,
//   isDeal = false,
//   forListing = true,
//   plain = false,
// }: {
//   price: number
//   className?: string
//   listPrice?: number
//   isDeal?: boolean
//   forListing?: boolean
//   plain?: boolean
// }) => {
//   const discountPercent = Math.round(
//     100 - (price / listPrice) * 100
//   )
//   const stringValue = price.toString()
//   const [intValue, floatValue] = stringValue.includes('.')
//     ? stringValue.split('.')
//     : [stringValue, '']

//   return plain ? (
//     formatCurrency(price)
//   ) : listPrice == 0 ? (
//     <div className={cn('text-3xl', className)}>
//       <span className='text-xs align-super'>$</span>
//       {intValue}
//       <span className='text-xs align-super'>{floatValue}</span>
//     </div>
//   ) : isDeal ? (
//     <div className='space-y-2'>
//       <div className='flex justify-center items-center gap-2'>
//         <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
//           {discountPercent}% Off
//         </span>
//         <span className='text-red-700 text-xs font-bold'>
//           Limited time deal
//         </span>
//       </div>
//       <div
//         className={`flex ${forListing && 'justify-center'} items-center gap-2`}
//       >
//         <div className={cn('text-3xl', className)}>
//           <span className='text-xs align-super'>$</span>
//           {intValue}
//           <span className='text-xs align-super'>{floatValue}</span>
//         </div>
//         <div className='text-muted-foreground text-xs py-2'>
//           Was:<span className='line-through'>{formatCurrency(listPrice)}</span>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className=''>
//       <div className='flex justify-center gap-3'>
//         <div className='text-3xl text-orange-700'>-{discountPercent}%</div>
//         <div className={cn('text-3xl', className)}>
//           <span className='text-xs align-super'>$</span>
//           {intValue}
//           <span className='text-xs align-super'>{floatValue}</span>
//         </div>
//       </div>
//       <div className='text-muted-foreground text-xs py-2'>
//         ListPrice:{' '} <span className='line-through'>{formatCurrency(listPrice)}</span>
//       </div>
//     </div>
//   )
// }

// export default ProductPrice

'use client'
import { cn, formatCurrency } from '@/lib/utils'

const USD_TO_INR = 83 // static conversion rate

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number
  className?: string
  listPrice?: number
  isDeal?: boolean
  forListing?: boolean
  plain?: boolean
}) => {
  // ✅ Convert USD → INR
  const priceInINR = price * USD_TO_INR
  const listPriceInINR = listPrice * USD_TO_INR

  // ✅ Calculate discount (avoid NaN if no listPrice)
  const discountPercent =
    listPrice > 0 ? Math.round(100 - (priceInINR / listPriceInINR) * 100) : 0

  // ✅ Format once
  const formattedPrice = formatCurrency(priceInINR, 'en-IN', 'INR')
  const formattedListPrice = listPrice
    ? formatCurrency(listPriceInINR, 'en-IN', 'INR')
    : ''

  if (plain) {
    return <>{formattedPrice}</>
  }

  if (listPrice === 0) {
    return (
      <div className={cn('text-3xl', className)}>
        {formattedPrice}
      </div>
    )
  }

  if (isDeal) {
    return (
      <div className="space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span className="bg-red-700 rounded-sm p-1 text-white text-sm font-semibold">
            {discountPercent}% Off
          </span>
          <span className="text-red-700 text-xs font-bold">
            Limited time deal
          </span>
        </div>
        <div
          className={`flex ${forListing && 'justify-center'} items-center gap-2`}
        >
          <div className={cn('text-3xl', className)}>{formattedPrice}</div>
          <div className="text-muted-foreground text-xs py-2">
            Was: <span className="line-through">{formattedListPrice}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center gap-3">
        <div className="text-3xl text-orange-700">-{discountPercent}%</div>
        <div className={cn('text-3xl', className)}>{formattedPrice}</div>
      </div>
      <div className="text-muted-foreground text-xs py-2">
        ListPrice:{' '}
        <span className="line-through">{formattedListPrice}</span>
      </div>
    </div>
  )
}

export default ProductPrice

