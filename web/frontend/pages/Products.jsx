import React from 'react';
import {
  Grid,
  Layout,
  LegacyCard,
  Page,
  Spinner,
} from "@shopify/polaris";
import { useQuery } from "react-query";
const Products = () => {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [formData, setFormData] = useState({});

 

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/store/products");
      return await response.json();
    }
  });
  console.log("Data",data?.products?.data)
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <button className='button'>New Product</button>
          <button className='button'>Delete Product</button>
        </Layout.Section>
        <Layout.Section>
          {isLoading ? (
            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <Spinner accessibilityLabel="Loading products" size="large" />
            </div>
          ) : (
            <Grid>
              {data?.products?.data?.map((product, index) => {
                return (
                  <Grid.Cell key={index} columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 3 }}>
                    <div className="card">
                      <LegacyCard sectioned>
                      <img 
                          src={product?.image?.src ? product.image.src : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="lightgray"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="black">No Image</text></svg>'} 
                          alt={product?.image?.alt || 'Demo product image'} 
                          className='product-image' 
                        />
                        <h2 className='product-title'>{product.title}</h2>
                        <p className='product-price'>${product?.variants[0]?.compare_at_price ? product.variants[0].compare_at_price : 0.00}</p>
                      </LegacyCard>
                    </div>
                  </Grid.Cell>
                );
              })}
            </Grid>
          )}
        </Layout.Section>
      </Layout>

      {/* {isModalOpen && (
        <div className='product-modal'>
          <p className="btn-close" onClick={() => setIsModalOpen(false)}>X</p>
          <div className="modal-form">
            <form onSubmit={submitHandler}>
              <div className="image-block">
                <img src={formData?.images?.edges[0]?.node?.originalSrc} alt="product media" />
              </div>
              <div className="form-fields">
                <input type="hidden" name="id" value={formData.id} />
                <input type="text" name="title" id="title" value={formData.title} onChange={valueHandler} />
                <input type="number" name="price" id="price" value={formData.variants.edges[0]?.node?.price} onChange={valueHandler} />
                <textarea name="description" id="body_html" cols="30" rows="10" value={formData.description} onChange={valueHandler}></textarea>
                <input type="text" name="handle" id="handle" value={formData.handle} onChange={valueHandler} />
                <input className='button' type="submit" value="Update" />
              </div>
            </form>
          </div>
        </div>
      )} */}
    </Page>
  );
};

export default Products;