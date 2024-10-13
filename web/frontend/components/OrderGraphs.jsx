import React, { useState } from 'react'
import { Layout, LegacyCard } from "@shopify/polaris";
import {storeData} from "../data";
import {Chart as chartJS} from "chart.js/auto";
import {Line, Doughnut,Bar} from "react-chartjs-2"
export const OrderGraphs = () => {
    const [data,setData] = useState({
        labels: storeData.map((d)=>d.year),
        datasets:[{
            label:"order details",
            data:storeData.map((d)=>d.order),
            backgroundColor:["#008170","#000000","#8e8e8e","81BF37"]
        }]

    });
  return (
    <Layout>
        <Layout.Section oneHalf>
            <LegacyCard title="Total Orders" sectioned>
                <Line data={data} options={{responsive:true,maintainAspectRatio:false}}/>
            </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
            <LegacyCard title="Completed Orders" sectioned>
                <Doughnut data={data} options={{responsive:true,maintainAspectRatio:false}}/>
            </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
            <LegacyCard title="Remaining Orders" sectioned>
                <Bar data={data} options={{responsive:true,maintainAspectRatio:false}}/>
            </LegacyCard>
        </Layout.Section>
    </Layout>
  )
}