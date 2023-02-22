import React, { useEffect } from "react";
import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { getProducts } from "../Redux/Product/product.action";
import MenProductDetails from "./MenProductDetails";

export default function MensProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = "sm";
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.ProductReducer.productsData);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <>
      <Button colorScheme="white" color={"black"} onClick={onOpen}>
        Filter
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody display={"flex"} justifyContent="space-between">
            <Input
              style={{ width: "40%" }}
              placeholder="₹                         0"
            />
            <Text>To</Text>
            <Input
              style={{ width: "40%" }}
              placeholder="₹              22995.0"
            />
          </DrawerBody>
          <DrawerBody style={{ marginTop: "-400px", width: "100%" }}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor="white"
                color="black"
                width="100%"
                textAlign={"left"}
              >
                Product type
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Download</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          backgroundColor="white"
        >
          Featured
        </MenuButton>
        <MenuList>
          <MenuItem>Featured</MenuItem>
          <MenuItem>Best Selling</MenuItem>
          <MenuItem>Alphabetically, A-Z</MenuItem>
          <MenuItem>Alphabetically, Z-A</MenuItem>
          <MenuItem>Price, low to high</MenuItem>
          <MenuItem>Price, high to low</MenuItem>
          <MenuItem>Date, old to new</MenuItem>
          <MenuItem>Date, new to old</MenuItem>
        </MenuList>
      </Menu>

      <div>
        <Flex flexWrap={"wrap"} justifyContent="center">
          {products.length > 0 &&
            products.map((item) => (
              <MenProductDetails key={item.id} {...item} />
            ))}
        </Flex>
      </div>
    </>
  );
}
