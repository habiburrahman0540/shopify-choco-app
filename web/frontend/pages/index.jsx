import {
  Layout,
  Page,
} from "@shopify/polaris";
import { Card, OrderDetails, OrderGraphs } from "../components";
import { useQuery } from "react-query";

export default function HomePage() {

  const {
    data:products
  } = useQuery({
    queryKey: ["ProductCount"],
    queryFn: async () => {
      const response = await fetch("/api/products/count");
      return await response.json();
    }
  });
  const {
    data:colletions
  } = useQuery({
    queryKey: ["CollectionCount"],
    queryFn: async () => {
      const response = await fetch("/api/collections/count");
      return await response.json();
    }
  });
  
  const {
    data:orders
  } = useQuery({
    queryKey: ["OrdersCount"],
    queryFn: async () => {
      const response = await fetch("/api/orders/all");
      return await response.json();
    }
  });
  const {
    data:fulfillment
  } = useQuery({
    queryKey: ["FulfillmentOrdersCount"],
    queryFn: async () => {
      const request = await fetch("/api/orders/all");
      const responseData= await request.json();
      const fulfillmentOrder = responseData?.data?.filter(item=>item.fulfillment_status === 'fulfilled');
      return fulfillmentOrder;
    }
  });
  const {
    data:RemainOrder
  } = useQuery({
    queryKey: ["RemainOrdersCount"],
    queryFn: async () => {
      const request = await fetch("/api/orders/all");
      const responseData= await request.json();
      const fulfillmentOrder = responseData?.data?.filter(item=>item.fulfillment_status === 'fulfilled');
      return responseData.data.length -fulfillmentOrder.length;
    }
  });
  console.log("RemainOrder",RemainOrder)
  return (
    <Page fullWidth>
      <div className="home-section">
          <div className="graphs-section">
            <OrderGraphs/>
          </div>
          <div className="cards-section">
            <Layout>             
                <Card title="Total Order" data={orders?.data?.length} oderCard/>
                <Card title="Fulfillment Order" data={fulfillment?.length} FulFillmentCard/>
                <Card title="Remain Order" data={RemainOrder} RemainCard/>
                <Card title="Total Collections" data={colletions?.count} collectionCard/>
                <Card title="Total Products" data={products?.count} productCard/>
            </Layout>
          </div>
          <div className="order-section">
            <OrderDetails/>
          </div>
      </div>
    </Page>
  );
}
