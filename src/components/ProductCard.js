import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { config } from "./../App"
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Box from '@mui/material/Box';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Header from './Header';
import { blueGrey, red } from '@mui/material/colors';
import Footer from './Footer';
import "./ProductCard.css"
import { AddShoppingCartOutlined } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialogbox from './DialogBox';

import {
  Button,
  CardActions,
} from "@mui/material";

import FilterButton from "./FilterButton"

export default function ProductCards() {

  const { enqueueSnackbar } = useSnackbar();

  const [ProductCard, setProductCard] = useState([]); //Store all the products data that are used to show the in UI.

  const [ProductCard1, setProductCard1] = useState([]); //to store all the fetched products data

  const [searchData, setSearchData] = useState("");   //this is used to store the searched value

  const navigate = useNavigate(); // use to navigate to cart page

  const [state, setState] = React.useState({  // to store Staus of each filtered checkbox in bool 
    Red: false,
    Blue: false,
    "Green": false,
    Men: false,
    Women: false,
    "0-250": false,
    "251-450": false,
    "450-1000": false,
    "Polo": false,
    "Hoodie": false,
    "Basic": false
  });


  const [colorFilter, setColorFilter] = useState([]) //to store clicked value of the color filters in OR condition.   
  const [genderFilter, setGenderFilter] = useState([]) //to store clicked value of the gender filters in OR condition.
  const [priceFilter, setPriceFilter] = useState([]) //to store clicked value of the price filters in OR condition.
  const [typeFilter, setTypeFilter] = useState([]) //to store clicked value of the type filters in OR condition.

  const [clickCart, setClickCart] = useState(false) //store the change state value when add to cart button gets clicked. 


  // When any of the checkbox under color filter gets clicked this function will execute to store all the matched values of the clicked color checkbox and the fetch data in OR condition in colorFilter state  

  const ColorFilterChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    let k = []
    if (event.target.checked) {
      ProductCard1.forEach((x) => {                           //filter added so adding filtered result in the state
        if (x["color"] === event.target.name) {
          if (colorFilter.find((y) => y["id"] === x["id"])) {
            //return
          }
          else {
            k.push(x)
          }
        }
      })

      setColorFilter([...colorFilter, k].flat())
    }
    else {
      let f = []
      colorFilter.forEach((x) => {                       //filter removed so removing unchecked values result from the state
        if (x["color"] !== event.target.name) {
          k.push(x)
        }
      })
      setColorFilter(k)
    }
  }

  // When any of the checkbox under gender filter gets clicked this function will execute to store all the matched values of the clicked gender checkbox and the fetch data in OR condition in genderFilter state  


  const GenderFilterChange = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    let k = []
    if (event.target.checked) {
      ProductCard1.forEach((x) => {                           //filter added so adding filtered result in the state
        if (x["gender"] === event.target.name) {

          if (genderFilter.find((y) => y["id"] === x["id"])) {
            //return
          }
          else {
            k.push(x)
          }

        }
      })

      setGenderFilter([...genderFilter, k].flat())
    }
    else {
      genderFilter.filter((x) => {                       //filter removed so removing filtered result from the state
        if (x["gender"] !== event.target.name) {
          k.push(x)
        }
      })
      setGenderFilter(k)

    }
  }
  // console.log(genderFilter,colorFilter)

  // When any of the checkbox under price filter gets clicked this function will execute to store all the matched values of the clicked price checkbox and the fetch data in OR condition in priceFilter state 

  const PriceFilterChange = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });


    let temporaryData = event.target.name

    let splitprice = temporaryData.toString().split("-")
    let k = []
    if (event.target.checked) {
      ProductCard1.forEach((x) => {                           //filter added so adding filtered result in the state
        if ((x["price"] >= splitprice[0]) && (x["price"] <= splitprice[1])) {

          if (priceFilter.find((y) => y["id"] === x["id"])) {
            //return
          }
          else {
            k.push(x)
          }
        }
      })

      setPriceFilter([...priceFilter, k].flat())
    }
    else {
      priceFilter.forEach((x) => {                       //filter removed so removing filtered result from the state
        if ((x["price"] >= !splitprice[0]) && (x["price"] <= !splitprice[1])) {
          k.push(x)
        }
      })
      setPriceFilter(k)

    }

  }
  // console.log("Price", priceFilter)

  // When any of the checkbox under type filter gets clicked this function will execute to store all the matched values of the clicked type checkbox and the fetch data in OR condition in typeFilter state 


  const TypeFilterChange = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    let k = []
    if (event.target.checked) {

      ProductCard1.forEach((x) => {                           //filter added so adding filtered result in the state
        if (x["type"] === event.target.name) {
          if (typeFilter.find((y) => y["id"] === x["id"])) {
            //return
          }
          else {
            k.push(x)
          }
        }
      })

      setTypeFilter([...typeFilter, k].flat())
    }
    else {
      typeFilter.forEach((x) => {                       //filter removed so removing filtered result from the state
        if (x["type"] !== event.target.name) {
          k.push(x)
        }
      })
      setTypeFilter(k)

    }
  }
  // console.log(typeFilter)

  async function fetchData() {

    try {

      const response = await axios.get(`${config.endpoint}`);

      setProductCard(response.data)   //extracting total videos. 
      setProductCard1(response.data)   //extracting total videos. 
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch data. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }

  }


  //Filter function is used to do AND condition between all the category filter and the search value      

  function Filter() {

    let copyProductCard = ProductCard1

    if ((searchData.length !== 0) || (colorFilter.length !== 0) || (genderFilter.length !== 0) || (priceFilter.length !== 0) || (typeFilter.length !== 0)) {

      if (colorFilter.length > 0) {
        let k = []

        copyProductCard.forEach((x) => {
          if (colorFilter.find((y) => y["id"] === x["id"])) {
            k.push(x)
          }
        })
        copyProductCard = [...k]
      }

      if (genderFilter.length > 0) {

        let k = []

        copyProductCard.forEach((x) => {
          if (genderFilter.find((y) => y["id"] === x["id"])) {
            k.push(x)
          }
        })

        copyProductCard = [...k]

      }

      if (priceFilter.length > 0) {

        let k = []

        copyProductCard.forEach((x) => {                           //filter added so adding filtered result in the state
          if (priceFilter.find((y) => y["price"] === x["price"])) {
            k.push(x)
          }
        })

        copyProductCard = [...k]
      }

      if (typeFilter.length > 0) {
        let k = []

        copyProductCard.forEach((x) => {
          if (typeFilter.find((y) => y["id"] === x["id"])) {
            k.push(x)
          }
        })
        copyProductCard = [...k]
      }

      if ((searchData.length > 0) && (searchData)) {
        let k = []
        copyProductCard.forEach((x) => {

          if ((x["name"].toUpperCase().includes(searchData.toUpperCase())) || (x["type"].toUpperCase().includes(searchData.toUpperCase())) || (x["color"].toUpperCase().includes(searchData.toUpperCase()))) {
            k.push(x)
          }
        })
        copyProductCard = [...k]
      }

      copyProductCard.sort((m, n) => m["id"] - n["id"])  // to place items on order of id 

      setProductCard(copyProductCard)
    }

    else {
      setProductCard(ProductCard1)
    }

  }


  // console.log("productCard", ProductCard, "totalDataId", totalDataId)

  //fetchData function will execute single time to fetch data from API. 

  useEffect(() => {
    fetchData()

    if (!localStorage.getItem("addedItems")) {   //if addItems key of local storage is empty then it will store empty array value.  
      localStorage.setItem("addedItems", JSON.stringify([]))
    }

  }, [])

  //Filter function will execute if user serach anything or clicked on any checkbox of the filter. 

  useEffect(() => {

    Filter()

  }, [state, searchData])

  //This function will execute everytime ADD TO CART button gets clicked
  //  Addtocartbuttonclick function store the details of the all the added items in cart in localstorage whose key is "addedItems"

  function Addtocartbuttonclick(e, x) {

    let k1 = []
    x["addedQuantity"] = 1
    let k = JSON.stringify(x)
    // console.log(x)

    if (localStorage.getItem("addedItems")) {
      k1 = JSON.parse(localStorage.getItem("addedItems"))
      k1.sort((m, n) => m["id"] - n["id"]) //storing the values in sorted order
    }
    k1.push(x)

    k1 = JSON.stringify(k1)
    localStorage.setItem("addedItems", k1) //storing each jason value
    localStorage.setItem(x["id"], x["id"])

    setClickCart((prevState) => prevState === true ? false : true)
  }

  //clicking on GO TO CART icon will navigate user to the cart page. 

  function GoTOCART(e, x) {
    navigate("/cart")
  }


  return (
    <>
      <Box sx={{ minHeight: '100vh' }} className="ProductCard">
        {/* spacing={2} */}
        <Grid container sx={{ minHeight: '100vh' }} >

          {/* Header component */}

          <Grid item xs={12} >
            <Header searchData={searchData} setSearchData={setSearchData} />
          </Grid>

          {/* Filter button in mobile screen, till 899px it will show after that none */}

          <Grid item xs={12} className="Filter">
            <Dialogbox state={state} ColorFilterChange={ColorFilterChange} GenderFilterChange={GenderFilterChange}
              TypeFilterChange={TypeFilterChange} PriceFilterChange={PriceFilterChange} />
          </Grid>


          {/* Filter button in large screen , after 899px it will show */}

          <Grid item md={2} className="FilterBox">

            <FilterButton ColorFilterChange={ColorFilterChange} state={state} GenderFilterChange={GenderFilterChange}
              TypeFilterChange={TypeFilterChange} PriceFilterChange={PriceFilterChange}
            />

          </Grid>


          {/* Card Box */}

          <Grid item xs={12} md={10} className="CardBox">

            {/* Each Product card details */}

            <Grid container className="CardBoxGrid">

              {
                ProductCard.length === 0 ? <Box sx={{ m: 2 }}><h1>No Data found... </h1><SentimentVeryDissatisfiedIcon fontSize={'large'} /> </Box> : <> {ProductCard.map((x, y) =>
                  <Grid item className='card' xs={6} sm={6} md={2} key={y} sx={{ m: 2 }}>
                    <Card sx={{ maxWidth: 276, maxHeight: 300, color: red[900], bgcolor: blueGrey[900], boxShadow: "5px 10px red" }} className="card1">

                      <CardMedia
                        component="img"
                        height="153"
                        width="100%"
                        image={x.imageURL}
                        alt="green iguana"

                      />

                      <CardContent  >
                        <Typography gutterBottom variant="h5" className="Carddetails" component="div">
                          {x.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" className="Carddetails" component="div">
                          Rs {x.price}
                        </Typography>

                      </CardContent>

                      <CardActions >
                        {
                          localStorage.getItem(x["id"]) != x["id"] ? <> <Button className="card-button" startIcon={<AddShoppingCartOutlined color='secondary' />} fullWidth={true} variant="contained" color='primary' onClick={(e) => Addtocartbuttonclick(e, x)}

                          >
                            <span style={{ color: blueGrey[900] }}> ADD TO CART </span>
                          </Button> </> : <>

                            <Button className="card-button" startIcon={<ShoppingCartIcon color='secondary' />} fullWidth={true} variant="contained" color='primary' onClick={(e) => GoTOCART(e, x)}

                            >
                              <span style={{ color: blueGrey[900] }}> Go TO CART </span></Button></>

                        }


                      </CardActions>

                    </Card> </Grid>)

                }</>
              }
            </Grid>
          </Grid>

          {/* Footer component */}

          <Grid item xs={12} >

            <Footer />
          </Grid>


        </Grid>

      </Box >
    </>
  );
}
