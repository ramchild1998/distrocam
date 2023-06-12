import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const CustomModal = ({ product, isOpen, toggle }) => {
  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    id: '',
    image: '',
    title: '',
    sellPrice: '',
    buyPrice: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        image: '',
        title: '',
        sellPrice: '',
        buyPrice: '',
        stock: '',
      });
    }
  }, [product]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      alert('no such file');
      return; 
    }

    alert(file);
  
    
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const isValidExtension = allowedExtensions.includes(fileExtension);
  
    if (!isValidExtension) {
      console.error('Invalid file type. Only PNG, JPG, and JPEG files are allowed.');
      return;
    }
  
    const maxSizeKB = 100;
    const maxSizeBytes = maxSizeKB * 1024;
    const isSizeValid = file.size <= maxSizeBytes;
  
    if (!isSizeValid) {
      console.error('File size exceeds the maximum limit of 100KB.');
      return;
    }
  
    setFile(file);
  }; 


  const onSaveProduct = (product, imageFile) => {
    const { id, image, title, sellPrice, buyPrice, stock } = product;
  
    
    const productData = {
      id,
      image,
      title,
      sellPrice,
      buyPrice,
      stock,
    };
  
    if (file) {
      
      const formData = new FormData();
      formData.append('image', file);
      
      axios
        .post(`api/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const imagePath = response.image;
          productData.image = imagePath;
  
          saveOrUpdateProduct(productData);
        })
        .catch((error) => {
          console.error('Error saving image:', error);
        });
    } else {
      console.log("image pass, no upload");
      saveOrUpdateProduct(productData);
    }
  };

  const saveOrUpdateProduct = (productData) => {
    try {
      let products = JSON.parse(localStorage.getItem('products')) || [];
  
      if (productData.id) {
        
        const existingProductIndex = products.findIndex((p) => p.id === productData.id);
        productData.image = products[existingProductIndex].image;
  
        if (existingProductIndex !== -1) {
          products[existingProductIndex] = productData;
          console.log('Product updated:', products);
        }
      } else {
        const newProductId = Date.now().toString();
  
        
        productData.id = newProductId;
        products.push(productData);
        console.log('New product added:', products);
      }
  
      localStorage.setItem('products', JSON.stringify(products));
      window.location.reload();
    } catch (error) {
      console.error('Error saving or editing product:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveProduct(formData, file);
    toggle();
  };

  const handleDelete = (event) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProductIndex = products.findIndex((p) => p.id === formData.id)
    if (existingProductIndex !== -1) {
      const updatedProducts = products.filter((product) => product.id !== formData.id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      window.location.reload();
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{product ? 'Edit Product' : 'Add New Product'}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="image">Image</Label>
            <Input type="file" name="image" id="image" onChange={handleFileChange} />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="sellPrice">Sell Price</Label>
            <Input type="number" name="sellPrice" id="sellPrice" value={formData.sellPrice} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="buyPrice">Buy Price</Label>
            <Input type="number" name="buyPrice" id="buyPrice" value={formData.buyPrice} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="stock">Stock</Label>
            <Input type="number" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>{product ? 'Save Changes' : 'Add Product'}</Button>{' '}
        {product ? <><Button color="danger" onClick={handleDelete}>Delete</Button></> : <></>}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;