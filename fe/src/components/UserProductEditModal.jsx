import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from 'axios';

function UserProductEditModal({ isOpen, onClose, product, onUpdate }) {
  // State untuk menyimpan nilai form
  const [updatedProduct, setUpdatedProduct] = useState({})
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const userToken = localStorage.getItem("user_token");
      const response = await axios.get("http://localhost:5500/categories/user", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  // Perbarui state saat input berubah
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'image') {
      setUpdatedProduct({ ...updatedProduct, [name]: e.target.files[0] })
    } else {
      setUpdatedProduct({ ...updatedProduct, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Deklarasi FormData object
      const formData = new FormData()

      // Append form data ke FormData object
      Object.entries(updatedProduct).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Panggil fungsi onUpdate untuk mengirim data yang diperbarui
      onUpdate(formData)
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setUpdatedProduct(product)
  }, [product])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {updatedProduct && product && (
            <>
              <FormControl mt={4}>
                <FormLabel>Nama barang</FormLabel>
                <Input
                  name='product_name'
                  value={updatedProduct.product_name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Harga</FormLabel>
                <Input
                  name='price'
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Deskripsi</FormLabel>
                <Input
                  name='description'
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Input
                  name='active'
                  value={updatedProduct.active}
                  onChange={handleInputChange}
                />
              </FormControl><FormControl mt={4}>
                <FormLabel>Kategori</FormLabel>
                <Select
                  name="category_id"
                  value={updatedProduct.category_id}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Kategori Produk</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Simpan
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProductEditModal