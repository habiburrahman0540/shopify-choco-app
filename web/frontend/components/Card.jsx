import { Layout, LegacyCard } from '@shopify/polaris'
import React from 'react'

export const Card = ({title,data,productCard,collectionCard,oderCard,FulFillmentCard,RemainCard}) => {
  return (
    <Layout.Section oneThird>
        <LegacyCard title={title} sectioned>
            <h4 className='total_count'>
              {productCard && data}
              {collectionCard && data}
              {oderCard && data}
              {FulFillmentCard && data}
              {RemainCard && data}
              </h4>
        </LegacyCard>
    </Layout.Section>
  )
}