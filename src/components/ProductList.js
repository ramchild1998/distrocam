/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import CustomModal from './CustomModal';
import NotFound from '../pages/NotFound';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
    

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
      const storedProducts = JSON.parse(localStorage.getItem('products'));
      setProducts(storedProducts)
    }, [products]);

    const handleClick= (product) => {
      setProduct(product);
      toggleModal();
    };

    const rupiah = (number)=>{
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    }

  return ( 
    <> 
      {
        products ?
        <>
        {products.length > 0 && 
        <>
          <Row>
            {
            products.map((product, index) => (
              <Col md="3" key={index}>
                <Card className="rounded" onClick={() => handleClick(product)}>
                  <img src={product.image} alt={product.title} className="card-img-top" />
                  <CardBody>
                    <CardTitle>{product.title}</CardTitle>
                    <CardText color='#2B2A4C'> Sell Price: {rupiah(product.sellPrice)}</CardText>
                    <CardText color='#2B2A4C'>Buy Price: {rupiah(product.buyPrice)}</CardText>
                    <CardText>Stock: {product.stock}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))
            }
          </Row>
          <CustomModal product={product} isOpen={modalOpen} toggle={toggleModal}/>
        </>
      }
      {
        products.length < 1 && <> <NotFound/> </>
      }
        
        </> : <NotFound />
      } 
    </>
  );
};

export default ProductList;
