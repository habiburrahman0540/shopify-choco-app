import { Layout, LegacyCard } from '@shopify/polaris'
import React from 'react'

export const OrderDetails = () => {
  return (
    <Layout>
        <Layout.Section oneThird>
            <LegacyCard title="Order Details" sectioned>
                <p className='text-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quisquam ratione minima. Aperiam atque placeat laudantium fuga officia! Ratione, reprehenderit eligendi. Quidem asperiores voluptatem eveniet laborum sint ad, maxime obcaecati.</p>
            </LegacyCard>
        </Layout.Section>
    </Layout>
  )
}