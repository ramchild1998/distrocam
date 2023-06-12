import { Container, Card, CardBody, CardHeader } from 'reactstrap';
import ProductList from './ProductList';
import AddProductButton from './AddProductButton';

const ProductSection = () => {
  return (
    <section className="promo-section mt-4">
      <Container>
        <Card>
          <CardHeader className='justify-content-center'>
            <h4 className="float-start my-3">PROMO CAMERA</h4>
            <AddProductButton/>
          </CardHeader>
          <CardBody>
            <ProductList/>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default ProductSection;
