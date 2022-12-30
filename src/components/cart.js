import {
    AddOutlined,
    RemoveOutlined
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./cart.css";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Header from "./Header";
import Footer from "./Footer";
import Grid from '@mui/material/Grid';
import { blueGrey, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


// ItemQuantity component is used to show Add, sub button and the no of quantity of the product added    

const ItemQuantity = ({
    value,
    handleAdd,
    handleDelete,
    currentitem,
}) => {
    return (
        <Stack direction="row" alignItems="center">
            <IconButton size="small" color="primary" onClick={(e) => handleDelete(e, currentitem)}>
                <RemoveOutlined />
            </IconButton>
            <Box padding="0.5rem" data-testid="item-qty">
                {value}
            </Box>
            <IconButton size="small" color="primary" onClick={(e) => handleAdd(e, currentitem)}>
                <AddOutlined />
            </IconButton>
        </Stack>
    );
};

const Cart = () => {


    const { enqueueSnackbar } = useSnackbar()
    let addedItems = JSON.parse(localStorage.getItem("addedItems"))
    const [productCard, setProductCard] = useState(addedItems);

    // const navigate = useNavigate();

    //This function is used to calculate total price    

    function TotalSumPrice() {

        let sum = 0
        productCard.forEach((x) => {

            sum += x["price"] * x["addedQuantity"]   //calculating total price
        }
        )

        return sum
    }

    // This function is used to increment quantity in card

    function handleAdd(e, x) {
        let k = productCard.filter((y) => y["id"] != x["id"])

        let clickedData = JSON.parse(JSON.stringify(productCard.find((y) => y["id"] == x["id"]))) //since we are modifying jason data so it will automatically changed the jason value in the array. 

        clickedData.addedQuantity = clickedData.addedQuantity + 1
        if (clickedData["addedQuantity"] <= clickedData["quantity"]) {

            k.push(clickedData)
            k.sort((m, n) => m["id"] - n["id"])  //sorting the array so that the when item quantity increased the order remains same. 
            setProductCard(k)

            localStorage.setItem("addedItems", JSON.stringify(k))
        }
        else {
            enqueueSnackbar("Cannot add more than this quantity", { variant: "error" });
        }

    }
    //This function is used to decrement quantity in card 

    function handleDelete(e, x) {

        let k = productCard.filter((y) => y["id"] != x["id"])

        let clickedData = productCard.find((y) => y["id"] == x["id"])
        clickedData.addedQuantity = clickedData.addedQuantity - 1
        if (clickedData["addedQuantity"] > 0) {

            k.push(clickedData)
            k.sort((m, n) => m["id"] - n["id"])  //sorting the array so that the when item quantity increased the order remains same. 
            setProductCard(k)

            localStorage.setItem("addedItems", JSON.stringify(k))

        }

        else {
            localStorage.setItem("addedItems", JSON.stringify(k))  //updating the local storage by removing the item that was cliked for remove
            localStorage.removeItem(x["id"])
            setProductCard(k)
        }
    }

    //This function is used to delete product from cart

    function DeleteButtonClick(x) {
        let k = productCard.filter((y) => y["id"] != x["id"])
        localStorage.setItem("addedItems", JSON.stringify(k))  //updating the local storage by removing the item that was cliked for remove
        localStorage.removeItem(x["id"])
        setProductCard(k)
    }

    return (
        <>
            <Box className="cart" >
                <Header isCart={true} />
              

                <Box className="cart">
                    {productCard.length === 0 ?
                         
                         
                        //if product card state is empty it will show No item added

                        <Grid container className="emptyData">
                            <Grid className="emptyData1" sx={{ color: red[900], bgcolor: blueGrey[900], boxShadow: "5px 10px red" }} >
                                <h5 className="emptyData1" style={{ minHeight: '50vh' }} >No item added</h5>
                            </Grid>
                        </Grid>


                        : 
                        //   Cart Details 

                        <Grid container className="emptyData2">
                            <Grid item className="emptyData1" sx={{ color: red[900], bgcolor: blueGrey[900], boxShadow: "5px 10px red" }} >
                                <Grid container direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <Grid item  >
                                        {productCard.map((x, y) => (

                                         
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center" key={y} sx={{ m: 2, p: 1, color: red[900], bgcolor: blueGrey[800], boxShadow: "5px 10px red" }} >
                                                <Grid container>

                                                    {/* Show Image of the item */}

                                                    <Box className="image-container">
                                                        <img
                                                            // Add product image
                                                            src={x.imageURL}
                                                            // Add product name as alt text
                                                            alt={x.name}
                                                            width="100%"
                                                            height="100%"
                                                        />
                                                    </Box>
                                                      
                                                     {/* Show ItemQuantity component  */}
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="space-between"
                                                        height="6rem"
                                                        padding="1rem"
                                                    >
                                                        <div>{x.name}</div>
                                                        <Box
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                        >
                                                            {productCard.length !== 0 && <ItemQuantity
                                                                
                                                                value={x["addedQuantity"]}
                                                                handleAdd={handleAdd}   //handleQuantity
                                                                currentitem={x}
                                                                handleDelete={handleDelete}   //handleQuantity

                                                            />}

                                                        </Box>
                                                        <Box padding="0.5rem" fontWeight="700">
                                                            Rs {x["price"]}
                                                        </Box>
                                                    </Box>

                                                        
                                                        {/* Delete Button */}

                                                    <Box display="flex"
                                                        flexDirection="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        className="DeleteButton"
                                                        sx={{ m: 1 }}
                                                    >
                                                        <Button variant="contained" onClick={(e) => { DeleteButtonClick(x) }} endIcon={<DeleteIcon />}>Delete</Button>
                                                    </Box>



                                                </Grid>
                                            </Grid>
                                            

                                        ))}

                                            {/* Show total sum price value */}
                                            
                                        <Grid container
                                            padding="1rem"
                                            // display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ m: 2, p: 1, color: red[900], bgcolor: blueGrey[800], boxShadow: "5px 10px red" }}
                                        >

                                            <Box alignSelf="center">
                                                <h5 style={{ color: red[900] }}>Total</h5>
                                            </Box>
                                            <Box
                                                alignSelf="center"
                                                data-testid="cart-total"
                                                sx={{ color: red[900] }}
                                            >
                                                <h5 style={{ color: red[900] }}>Rs {TotalSumPrice()}</h5>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>}
                </Box>

                <Footer />
            </Box>

        </>
    );
};

export default Cart;
